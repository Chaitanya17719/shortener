from django.urls import path
from django.urls import path
from . import views

urlpatterns = [
    path('shorten', views.shorten_url),
    path('<str:code>', views.redirect_url),
]