# from django.conf.urls import path
from django.urls import path, include
from .views import (
    ProductListApiView,
    ProductDetailApiView
)

urlpatterns = [
    path('api/', ProductListApiView.as_view()),
    path('api/<int:product_id>/', ProductDetailApiView.as_view()),
]