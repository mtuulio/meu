import json
import asyncio
import base64
from channels.generic.websocket import AsyncWebsocketConsumer
from io import BytesIO
from PIL import Image
import mss
import numpy as np
import time

class ScreenConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_streaming = False
        self.is_host = False
        self.stream_task = None
        
    async def connect(self):
        self.room_name = 'screen_share'
        self.room_group_name = f'screen_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        self.is_streaming = False
        
        # Cancel streaming task if exists
        if self.stream_task:
            self.stream_task.cancel()
            
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')
        
        if message_type == 'start_stream':
            self.is_host = True
            self.is_streaming = True
            # Capture window info if provided
            self.window_title = data.get('window_title', None)
            self.stream_task = asyncio.create_task(self.stream_screen())
            
        elif message_type == 'stop_stream':
            self.is_streaming = False
            if self.stream_task:
                self.stream_task.cancel()
                
        elif message_type == 'request_stream':
            # Viewer requesting stream
            await self.send(text_data=json.dumps({
                'type': 'stream_status',
                'is_streaming': any(self.is_streaming for _ in range(1))  # Check if any host is streaming
            }))

    async def stream_screen(self):
        """Capture and stream screen with minimal delay"""
        with mss.mss() as sct:
            # Get monitor or window to capture
            monitor = sct.monitors[1]  # Primary monitor
            
            last_frame_time = 0
            target_fps = 30  # Target 30 FPS for smooth experience
            frame_interval = 1.0 / target_fps
            
            while self.is_streaming:
                try:
                    current_time = time.time()
                    
                    # Control frame rate
                    if current_time - last_frame_time < frame_interval:
                        await asyncio.sleep(frame_interval - (current_time - last_frame_time))
                        continue
                        
                    # Capture screen
                    screenshot = sct.grab(monitor)
                    
                    # Convert to PIL Image
                    img = Image.frombytes('RGB', screenshot.size, screenshot.bgra, 'raw', 'BGRX')
                    
                    # Resize for better performance (reduce resolution)
                    max_width = 1280
                    if img.width > max_width:
                        ratio = max_width / img.width
                        new_size = (int(img.width * ratio), int(img.height * ratio))
                        img = img.resize(new_size, Image.Resampling.LANCZOS)
                    
                    # Convert to JPEG with optimization
                    buffer = BytesIO()
                    img.save(buffer, format='JPEG', quality=75, optimize=True)
                    img_data = buffer.getvalue()
                    
                    # Encode to base64
                    img_base64 = base64.b64encode(img_data).decode('utf-8')
                    
                    # Send to all viewers in the group
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'screen_frame',
                            'frame': img_base64,
                            'timestamp': current_time
                        }
                    )
                    
                    last_frame_time = current_time
                    
                except asyncio.CancelledError:
                    break
                except Exception as e:
                    print(f"Error streaming screen: {e}")
                    await asyncio.sleep(0.1)

    async def screen_frame(self, event):
        """Send screen frame to WebSocket"""
        if not self.is_host:  # Don't send frames back to the host
            await self.send(text_data=json.dumps({
                'type': 'frame',
                'frame': event['frame'],
                'timestamp': event['timestamp']
            }))