from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Product
from .serializers import ProductSerializer
from rest_framework import permissions

class ProductListApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the product items for given requested user
        '''
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Product with given product data
        '''
        data = {
            'name': request.data.get('name'), 
            'score': request.data.get('score'), 
            'category': request.data.get('category'), 
            'materials': request.data.get('materials'), 
            'user': request.user.id
        }
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductDetailApiView(APIView):
# add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, product_id):
        '''
        Helper method to get the object with given product_id, and user_id
        '''
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, product_id, *args, **kwargs):
        '''
        Retrieves the Product with given product_id
        '''
        product_instance = self.get_object(product_id)
        if not product_instance:
            return Response(
                {"res": "Object with product id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProductSerializer(product_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, product_id, *args, **kwargs):
        '''
        Updates the product item with given product_id if exists
        '''
        product_instance = self.get_object(product_id)
        if not product_instance:
            return Response(
                {"res": "Object with product id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'name': request.data.get('name'), 
            'score': request.data.get('score'), 
            'category': request.data.get('category'), 
            'materials': request.data.get('materials'),
            'user': request.user.id
        }
        serializer = ProductSerializer(instance = product_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, product_id, *args, **kwargs):
        '''
        Deletes the product item with given product_id if exists
        '''
        product_instance = self.get_object(product_id)
        if not product_instance:
            return Response(
                {"res": "Object with product id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        product_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )