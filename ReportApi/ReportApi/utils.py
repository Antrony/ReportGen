import logging
from . import settings


def update_log():
    """
    :return: return the log configuration
    """
    _log = logging.basicConfig(filename=settings.BASE_DIR+'/debug.log',level=logging.DEBUG, format='%(asctime)s,%(msecs)d %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s: ', datefmt='%m/%d/%Y %I:%M:%S %p', filemode='a')
    print(_log,settings.BASE_DIR)
    return _log