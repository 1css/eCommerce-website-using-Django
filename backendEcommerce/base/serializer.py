from rest_framework import serializers
from .models import Product,OrderItem,Order
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','_id','email','username','name','isAdmin']
    def get_isAdmin(self,obj):
        return obj.is_staff
    def get__id(self,obj):
        return obj.id
    
    def get_name(self,obj):
        name=obj.first_name
        if name=="":
            name=obj.email
        return name

class UserSerializerwithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'email', 'username', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):  
        token = RefreshToken.for_user(obj)
        return str(token.access_token)   
        
        
class ProductSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            '_id',
            'name',
            'image',
            'desciption',
            'rating',
            'price',
            'countInStock',
            'bestseller',
            'createdAt',
            'created_by',
            'created_at'
        ]

    def get_created_by(self, obj):
        return obj.user.first_name if obj.user else "admin"

    def get_created_at(self, obj):
        return obj.createdAt
    
    
class OrderItemSerializer(serializers.ModelSerializer):
        class Meta:
            model=OrderItem
            fields="__all__"
    
    
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_user(self, obj):
        return obj.user.email
        
        