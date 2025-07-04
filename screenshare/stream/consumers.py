from channels.generic.websocket import AsyncWebsocketConsumer

class ScreenConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept connection and add to screen group
        await self.accept()
        await self.channel_layer.group_add("screen", self.channel_name)

    async def disconnect(self, close_code):
        # Remove from group on disconnect
        await self.channel_layer.group_discard("screen", self.channel_name)

    # Handler for incoming frames sent via channel layer
    async def screen_frame(self, event):
        # Forward raw JPEG bytes directly to WebSocket clients
        await self.send(bytes_data=event["data"])