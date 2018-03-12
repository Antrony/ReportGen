import serpy

class UserSerializer(serpy.Serializer):
    id = serpy.IntField()
    username = serpy.Field()

class ProductSerializer(serpy.Serializer):
    id = serpy.IntField()
    product_name = serpy.Field()
    product_created_by = UserSerializer()
    product_created_date = serpy.Field()
    is_active = serpy.BoolField()
