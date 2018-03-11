from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import ProductSerializer

import logging

@api_view(['GET'])
def get_product(request):
    try:
        product_list = Products.objects.all().order_by('-id')
        serilized_product=ProductSerializer(product_list,many=True).data
        return Response(serilized_product)
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))

@api_view(['POST'])
def add_product(request):
    try:
        product_name = request.data.get('product_name')
        if not Products.objects.filter(product_name=product_name).exists():
            insert_product = Products(product_name=product_name,product_created_by=request.user)
            insert_product.save()
            return Response({'status':'success'})
        else:
            return Response({'status': 'exists'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))