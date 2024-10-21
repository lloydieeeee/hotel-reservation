from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Customer

User = get_user_model()


class CustomerSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"

    def save(self, **kwargs):
        phone_no = self.validated_data['phone_number']

        if not phone_no.startswith("+63"):
            phone_no = f'+63{self.validated_data['phone_number'].lstrip("+")}'

        password = self.validated_data["password"]
        re_password = self.validated_data["re_password"]

        if password != re_password:
            raise serializers.ValidationError(
                {"password": "Passwords do not match!"})

        user = Customer.customer.create_user(
            email=self.validated_data["email"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            dob=self.validated_data["dob"],
            phone_number=phone_no,
            home_address=self.validated_data["home_address"],
            province=self.validated_data["province"],
            city=self.validated_data["city"],
            barangay=self.validated_data["barangay"],
            zip_code=self.validated_data["zip_code"],
            password=password
        )

        return user
