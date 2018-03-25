from django.contrib.auth import authenticate

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from ReportApi.utils import update_log
import logging



update_log()

"""
    Function: Invalid URL function
"""
@api_view(['GET'])
@permission_classes((AllowAny,))
def Invalid(request):
    content = {'Error': 'Enter the valid URL'}
    logging.error({'URL Error': 'Invalid URL'})
    return Response(content)


@api_view(['POST'])
@permission_classes((AllowAny,))
def login_authenticate(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {'token': token.key,'user': token.user.username,'status': 'logged_in'})
        else:
            return Response({'status': 'login_failure'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error '+str(e))

@api_view(['POST'])
@permission_classes((AllowAny,))
def forgot_password(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {'token': token.key,'user': token.user.username,'status': 'logged_in'})
        else:
            return Response({'status': 'login_failure'})
    except Exception as e:
        logging.error({'Request Error': e})
        return Response('Request Error '+str(e))
