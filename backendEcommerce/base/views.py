from django.shortcuts import render
from base.serializer import UserSerializer,UserSerializerwithToken,OrderSerializer
from rest_framework.decorators import api_view,permission_classes
from base.serializer import ProductSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import logging
from datetime import datetime
from django.utils import timezone
from django.db.models import Q
from .models import Product,Order,OrderItem
import logging
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt


logger = logging.getLogger(__name__)
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        return super().validate(attrs)

        serializer=UserSerializerwithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
    
class myTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
    
@csrf_exempt
@api_view(['POST'])
def getRegister(request):
    data = request.data
    print(data.get('name'), 'data')

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.objects.filter(username=email).exists():
        return Response({'detail': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            first_name=name,
            username=email,
            email=email,
            password=make_password(password)
        )

        serializer = UserSerializerwithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        print("data2")
        return Response({'detail': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)

    # Serialize *after* successful creation
    try:
        serializer = UserSerializerwithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': 'Serialization failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getProducts(request):
    product=Product.objects.all()
    serializer=ProductSerializer(product,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductDetails(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    
    try:
        user = request.user
        data = request.data
        order_items = data.get('orderItems', [])
        
        if not order_items:
            return Response(
                {'detail': 'No Order items'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Convert string prices to float
        total_price = float(data['totalPrice'])
        shipping_price = float(data['shippingPrice'])
        tax_price = float(data['taxPrice'])
        
        # Use transaction to ensure data consistency
        with transaction.atomic():
            # Create the order
            order = Order.objects.create(
                user=user,
                paymentMethod=data['paymentMethod'],
                taxPrice=tax_price,
                totalPrice=total_price
            )
            
            # Process each order item
            for item in order_items:
                # Get the existing product (don't create new one)
                try:
                    product = Product.objects.get(_id=item['product'])
                except Product.DoesNotExist:
                    logger.error(f"Product {item['product']} does not exist")
                    raise Product.DoesNotExist(f"Product {item['product']} not found")
                
                # Check stock availability
                qty = int(item['qty'])
                if qty > product.countInStock:
                    return Response(
                        {'detail': f'Insufficient stock for {product.name}. Available: {product.countInStock}, Requested: {qty}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Create order item
                OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=qty,
                    price=float(item['price'])
                )
                
                # Deduct stock
                product.countInStock -= qty
                product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Product.DoesNotExist as e:
        logger.error(f"Product does not exist: {str(e)}")
        return Response(
            {'detail': str(e)}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error processing order: {str(e)}")
        return Response(
            {'detail': 'An error occurred while processing your order'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )