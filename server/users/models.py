from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(email=email, **kwargs)

        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password=password, **kwargs)

        admin_role = User.Role.ADMIN

        user.is_superuser = True
        user.is_staff = True
        user.role = admin_role
        user.save(using=self.db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin",
        RECEPTIONIST = "RECEPTIONIST", "Receptionist",
        CUSTOMER = "CUSTOMER", "Customer",

    email = models.EmailField(max_length=150, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()
    phone_number = models.CharField(max_length=13)
    home_address = models.CharField(max_length=150)
    province = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    barangay = models.CharField(max_length=150)
    zip_code = models.CharField(max_length=4)
    image = models.ImageField(blank=True, upload_to='users/')

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    role = models.CharField(max_length=12, blank=True, choices=Role.choices)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'dob', 'phone_number',
                       'home_address', 'province', 'city', 'barangay', 'zip_code']

    objects = UserManager()


class CustomerManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(email=email, **kwargs)

        customer_role = User.Role.CUSTOMER

        user.set_password(password)
        user.role = customer_role
        user.save(using=self.db)

        return user

    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)

        return results.filter(role=User.Role.CUSTOMER)


class Customer(User):
    customer = CustomerManager()

    class Meta:
        proxy = True
