from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

import logging


@api_view(['GET'])
def get_product(request):
    try:
        product_list = Products.objects.all().order_by('-id')
        serilized_product = ProductSerializer(product_list, many=True).data
        return Response(serilized_product)
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def add_product(request):
    try:
        product_name = request.data.get('product_name').lower()
        if not Products.objects.filter(product_name=product_name).exists():
            insert_product = Products(product_name=product_name, product_created_by=request.user)
            insert_product.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'exists'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['GET'])
def get_client(request):
    try:
        client_list = Client.objects.all().order_by('-id')
        serilized_client = ClientSerializer(client_list, many=True).data
        return Response(serilized_client)
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def add_client(request):
    try:
        client_data = request.data.get('client_data')
        if not Client.objects.filter(client_name=client_data['clientName']).exists():
            insert_client = Client(client_name=client_data['clientName'],
                                   client_first_name=client_data['clientFirstName'],
                                   client_last_name=client_data['clientLastName'],
                                   client_address=client_data['clientAddress'], client_email=client_data['clientEmail'],
                                   client_phone_number=client_data['clientPhone'])
            print(client_data['clientName'])
            insert_client.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'exists'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def get_program(request):
    try:
        client_id = request.data.get('client_id')
        program_list = Program.objects.filter(program_client=client_id).order_by('-id')
        serilized_program = ProgramSerializer(program_list, many=True).data
        from django.db.models import Sum
        for program in serilized_program:
            paid_amount = Payment.objects.filter(payment_program=program['id']).aggregate(Sum('payment_paid_amount'))
            if paid_amount['payment_paid_amount__sum']:
                program['program_paid_amount'] = paid_amount['payment_paid_amount__sum']
            else:
                program['program_paid_amount'] = 0
        return Response(serilized_program)
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def add_program(request):
    try:
        program_data = request.data.get('program_data')
        if not Program.objects.filter(program_name=program_data['programName'].lower()).exists():
            insert_program = Program(program_name=program_data['programName'].lower(),
                                     program_product_id=program_data['productId'],
                                     program_client_id=program_data['clientId'],
                                     program_start_date=program_data['startDate'],
                                     program_end_date=program_data['endDate'],
                                     program_total_amount=program_data['programTotalAmount'])
            insert_program.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'exists'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def get_payment(request):
    try:
        program_id = request.data.get('program_id')
        payment_list = Payment.objects.filter(payment_program=program_id).order_by('-id')
        serilized_payment = PaymentSerializer(payment_list, many=True).data
        return Response(serilized_payment)
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))


@api_view(['POST'])
def add_payment(request):
    try:
        insert_payment = Payment(payment_paid_amount=request.data.get('payment_paid_amount'),
                                 payment_program_id=request.data.get('payment_program_id'))
        insert_payment.save()
        return Response({'status': 'success'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error ' + str(e))
