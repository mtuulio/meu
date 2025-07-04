from django.shortcuts import render

# Create your views here.

def host_view(request):
    """View for the host who shares their screen"""
    return render(request, 'screen/host.html')

def viewer_view(request):
    """View for viewers who watch the shared screen"""
    return render(request, 'screen/viewer.html')

def index_view(request):
    """Landing page to choose between host and viewer"""
    return render(request, 'screen/index.html')
