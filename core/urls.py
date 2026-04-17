from django.urls import path
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),  # 👈 frontend here
    path('shorten', views.shorten_url),
    path('<str:code>', views.redirect_url),
    path('stats/<str:code>', views.get_stats),
]