from rest_framework import serializers
from .models import Room, RoomAmenity, RoomType


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


class RoomAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomAmenity
        fields = "__all__"


class RoomTypeSerializer(serializers.ModelSerializer):
    amenities = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = RoomType
        fields = "__all__"
