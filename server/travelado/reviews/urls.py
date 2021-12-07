from django.urls import path, include
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from . import views

urlpatterns = [
   path('', views.home, name='home'),
   path('login/', LoginView.as_view(), name='login'),
   path('logout/', LoginView.as_view(), name='logout'),
   path('signup/', views.signup, name='signup'),
   path('password/', views.password, name='password'),
   path('oauth/', include('social_django.urls', namespace='social')),
   path('admin/', admin.site.urls),
   path('current/', views.current_user, name='current_user'),
   path('home/', views.ListReviewsView.as_view(), name='list_reviews'),
   path("create/", views.CreateReviewsView.as_view(),name="create_review"),
   path("update/<int:pk>/",views.UpdateReviewsView.as_view(),name="update_review"),
   path("delete/<int:pk>/",views.DeleteReviewsView.as_view(),name="delete_review")
]