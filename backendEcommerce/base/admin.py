from django.contrib import admin

# Register your models here.
from .models import Product,Order,OrderItem

from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'price', 'countInStock', 'bestseller', 'user', 'createdAt')
    readonly_fields = ('createdAt',)  
    
admin.site.register(Order)
admin.site.register(OrderItem)
 
