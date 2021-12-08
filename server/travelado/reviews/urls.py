from django.urls import path, include
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
   path('home/', views.ListReviewsView.as_view(), name='list_reviews'),
   path("create/", views.CreateReviewsView.as_view(),name="create_review"),
   path("update/<int:pk>/",views.UpdateReviewsView.as_view(),name="update_review"),
   path("delete/<int:pk>/",views.DeleteReviewsView.as_view(),name="delete_review")
]
