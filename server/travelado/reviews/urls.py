from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListReviewsView.as_view(), name='index'),
    path("create", views.CreateReviewsView.as_view(),name="create_review"),
    path("update/<int:pk>/",views.UpdateReviewsView.as_view(),name="update_review"),
    path("delete/<int:pk>/",views.DeleteReviewsView.as_view(),name="delete_review")
]