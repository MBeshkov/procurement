# from django.conf.urls import path
from django.urls import path, include
from .views import (
    ProductListApiView,
    ProductDetailApiView
)

urlpatterns = [
    path('api/', ProductListApiView.as_view()),
    path('api/<str:code>/', ProductDetailApiView.as_view(), name='product-detail'),
]