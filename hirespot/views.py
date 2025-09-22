from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Recruiter, JobSeeker, Job, JobApplication
from .serializers import RecruiterSerializer, JobSeekerSerializer, JobSerializer, JobApplicationSerializer
from .permissions import IsRecruiterOrReadOnly

# -----------------------------
# Recruiter API
# -----------------------------
class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer
    permission_classes = [permissions.AllowAny]

# -----------------------------
# JobSeeker API
# -----------------------------
class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer
    permission_classes = [permissions.AllowAny]

# -----------------------------
# Job API
# -----------------------------
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsRecruiterOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user.recruiter_profile)

# -----------------------------
# JobApplication API
# -----------------------------
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.AllowAny]



# This is the landing page view at localhost:8000

def welcome(request):
    return render(request, "hirespot/welcome.html")