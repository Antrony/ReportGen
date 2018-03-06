from django.conf.urls import url
from .views import Invalid

urlpatterns = [
    url('^$', Invalid, name='invalid'),
]
