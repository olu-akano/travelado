from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AdminPasswordChangeForm, PasswordChangeForm, UserCreationForm
from django.contrib.auth import update_session_auth_hash, login, authenticate
from django.contrib import messages
from django.shortcuts import render, redirect
from social_django.models import UserSocialAuth
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from django.utils.decorators import method_decorator
from .models import Reviews
from .serializers import ReviewsSerializer
from dotenv import load_dotenv
from pathlib import Path
import os
import jwt

basepath = Path()
basedir = str(basepath.cwd())
env = basepath.cwd() / '.env'
load_dotenv(env)

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(
                username=form.cleaned_data.get('username'),
                password=form.cleaned_data.get('password1')
            )
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

@login_required
def home(request):
    return render(request, 'home.html')


@login_required
def password(request):
    if request.user.has_usable_password():
        PasswordForm = PasswordChangeForm
    else:
        PasswordForm = AdminPasswordChangeForm

    if request.method == 'POST':
        form = PasswordForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            messages.success(request, 'Your password was updated')
            return redirect('password')
        else:
            messages.error(request, 'Please resolve the error below.')
    else:
        form = PasswordForm(request.user)
    return render(request, 'registration/password.html', {'form': form})

@api_view(('GET',))
def current_user(request):
    secret = os.getenv('TOKEN_SECRET')
    user = request.user
    encoded_jwt = jwt.encode({"username": user.username, "source": "travelado"}, secret, algorithm="HS256")
    return JsonResponse({
      'token' : encoded_jwt,
    })

# Create your views here.
class ListReviewsView(ListAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

@method_decorator(login_required, name='dispatch')
class CreateReviewsView(CreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class UpdateReviewsView(UpdateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class DeleteReviewsView(DestroyAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer