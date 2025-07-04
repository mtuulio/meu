from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='index'),
    path('host/', views.host_view, name='host'),
    path('viewer/', views.viewer_view, name='viewer'),
]