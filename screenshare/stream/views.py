from django.shortcuts import render

# Create your views here.

def index(request):
    """Render the main screen share page."""
    return render(request, "index.html")
