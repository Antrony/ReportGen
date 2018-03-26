from django.conf.urls import url
from . import views

urlpatterns = [
    url('^product_list/$', views.get_product, name='product_list'),
    url('^add_product/$', views.add_product, name='add_product'),
    url('^client_list/$', views.get_client, name='client_list'),
    url('^add_client/$', views.add_client, name='add_client'),
    url('^program_list/$', views.get_program, name='program_list'),
    url('^add_program/$', views.add_program, name='add_program'),
    url('^payment_list/$', views.get_payment, name='payment_list'),
    url('^add_payment/$', views.add_payment, name='add_payment'),
]
