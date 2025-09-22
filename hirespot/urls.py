from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import welcome, RecruiterViewSet, JobSeekerViewSet, JobViewSet, JobApplicationViewSet

router = DefaultRouter()
router.register(r'recruiters', RecruiterViewSet)
router.register(r'jobseekers', JobSeekerViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'job-applications', JobApplicationViewSet)

urlpatterns = [
    path("", welcome, name="landing"),
    path("api/", include(router.urls)),
]





