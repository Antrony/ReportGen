from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
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
    return Response(content, status=status.HTTP_404_NOT_FOUND)
