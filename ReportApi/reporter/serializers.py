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


class ClientSerializer(serpy.Serializer):
    id = serpy.IntField()
    client_name = serpy.Field()
    client_first_name = serpy.Field()
    client_last_name = serpy.Field()
    client_address = serpy.Field()
    client_email = serpy.Field()
    client_phone_number = serpy.IntField()


class ProgramSerializer(serpy.Serializer):
    id = serpy.IntField()
    program_name = serpy.Field()
    program_product = ProductSerializer()
    program_client = ClientSerializer()
    program_start_date = serpy.Field()
    program_end_date = serpy.Field()
    program_total_amount = serpy.IntField()
