from django.contrib import admin
from django.urls import path
from . import views

urlpatterns=[
    path("user/register",views.getRegister ,name="register"),
    path("user/login",views.myTokenObtainPairView.as_view(),name="token_obtain_pair"),
    path('products/', views.getProducts, name='get-products'),
    
    path('products/<str:pk>/', views.getProductDetails, name='get-product-by-id'),
    path('orders/add/', views.addOrderItems, name='add-order'),
]