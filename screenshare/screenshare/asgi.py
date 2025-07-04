"""
ASGI config for screenshare project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import stream.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'screenshare.settings')

django_asgi_app = get_asgi_application()

# Define the ASGI application that routes HTTP and WebSocket:
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter(stream.routing.websocket_urlpatterns),
})
