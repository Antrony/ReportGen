from django.db import models
from django.contrib.auth.models import User


class Products(models.Model):
    product_name = models.CharField(max_length=255, default='null', unique=True)
    product_created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    product_created_date = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default='1')


class Client(models.Model):
    client_name = models.CharField(max_length=255, default='null', unique=True)
    client_first_name = models.CharField(max_length=255, default='null')
    client_last_name = models.CharField(max_length=255, default='null')
    client_address = models.CharField(max_length=255, default='null')
    client_email = models.CharField(max_length=255, default='null')
    client_phone_number = models.IntegerField(default='null')


class Program(models.Model):
    program_name = models.CharField(max_length=255, default='null')
    program_product = models.ForeignKey(Products, on_delete=models.CASCADE)
    program_client = models.ForeignKey(Client, on_delete=models.CASCADE)
    program_start_date = models.DateTimeField(null=True, blank=True)
    program_end_date = models.DateTimeField(null=True, blank=True)
    program_total_amount = models.IntegerField(default='null')
