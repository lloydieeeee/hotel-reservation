from django.db import models


class RoomAmenity(models.Model):
    name = models.CharField(max_length=50)


class RoomType(models.Model):
    amenities = models.ManyToManyField(RoomAmenity)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    guest_adult = models.IntegerField()
    guest_children = models.IntegerField()
    image = models.ImageField(upload_to='rooms/')
    price = models.IntegerField()


class Room(models.Model):
    class Status(models.TextChoices):
        VACANT = "VACANT", "Vacant",
        OCCUPIED = "OCCUPIED", "Occupied",
        RESERVED = "RESERVED", "Reserved",
        DIRTY = "DIRTY", "Dirty",

    number = models.CharField(max_length=8, unique=True)
    type = models.ForeignKey(RoomType, on_delete=models.DO_NOTHING)
    availability = models.CharField(
        max_length=8, default=Status.VACANT, choices=Status)

    def save(self):
        self.number = f'ROOM{self.number}'
        return super().save()
