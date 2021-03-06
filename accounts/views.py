from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User


from knox.models import AuthToken

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class UserAPIView(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ProfileAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        user = User.objects.filter(username=self.request.query_params.get('username', None))[0]
        return user


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        },
            status=status.HTTP_201_CREATED
        )


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        },
            status=status.HTTP_202_ACCEPTED
        )


class AccountUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class AccountDeleteAPIView(generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = User.objects.all()
