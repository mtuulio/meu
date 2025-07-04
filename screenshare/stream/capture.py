import asyncio
import os

import cv2
import mss
import numpy as np
import django

# Configure Django settings before importing channel layer
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "screenshare.settings")
django.setup()

from channels.layers import get_channel_layer  # noqa: E402


async def main():
    layer = get_channel_layer()
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # Capture the first monitor; adjust as needed
        while True:
            img = np.array(sct.grab(monitor))
            # Encode as JPEG (quality 70)
            _, jpeg = cv2.imencode(
                ".jpg", img, [int(cv2.IMWRITE_JPEG_QUALITY), 70]
            )
            await layer.group_send(
                "screen", {"type": "screen.frame", "data": jpeg.tobytes()}
            )
            await asyncio.sleep(1 / 30)  # ~30 FPS


if __name__ == "__main__":
    asyncio.run(main())