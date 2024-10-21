from django.contrib import admin
from .models import Room, RoomAmenity, RoomType

# Register your models here.
admin.site.register(Room)
admin.site.register(RoomAmenity)
admin.site.register(RoomType)
