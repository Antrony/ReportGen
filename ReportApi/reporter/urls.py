from django.conf.urls import url
from . import views

urlpatterns = [
    url('^product_list/$', views.get_product, name='product_list'),
    url('^add_product/$', views.add_product, name='add_product'),
]
