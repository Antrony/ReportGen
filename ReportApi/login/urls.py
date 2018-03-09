from django.conf.urls import url
from . import views

urlpatterns = [
    url('^$', views.Invalid, name='invalid'),
    url('^login/$', views.login_authenticate, name='login'),
]
