from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recruiter, JobSeeker, Job, JobApplication



# -----------------------------
# User Serializer
# -----------------------------

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # hashes password
        user.save()
        return user


# -----------------------------
# Recruiter Serializer
# -----------------------------

class RecruiterSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Recruiter
        fields = ["id", "user", "company_name", "company_size", "country", "state", "website", 
                  "contact_number", "bio"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        recruiter = Recruiter.objects.create(user=user, **validated_data)
        return recruiter

# -----------------------------
# JobSeeker Serializer
# -----------------------------

class JobSeekerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = JobSeeker
        fields = ["id", "user", "gender", "ethnicity", "country", "state", "cell_number", "resume", 
                  "bio", "skills", "experience"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        jobseeker = JobSeeker.objects.create(user=user, **validated_data)
        return jobseeker


# -----------------------------
# Job Serializer
# -----------------------------

class JobSerializer(serializers.ModelSerializer):
    posted_by_id = serializers.PrimaryKeyRelatedField(
        source='posted_by', queryset=Recruiter.objects.all(), write_only=True
    )
    posted_by = RecruiterSerializer(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'company_name', 'posted_by', 'posted_by_id',
            'location', 'job_type', 'salary_min', 'salary_max', 'currency',
            'requirements', 'benefits', 'experience_level', 'category',
            'posted_at', 'closing_date', 'is_active', 'created_at', 'updated_at'
        ]

# -----------------------------
# JobApplication Serializer
# -----------------------------

class JobApplicationSerializer(serializers.ModelSerializer):
    # Accept PKs for POST
    applicant_id = serializers.PrimaryKeyRelatedField(
        source='applicant', queryset=JobSeeker.objects.all(), write_only=True
    )
    job_id = serializers.PrimaryKeyRelatedField(
        source='job', queryset=Job.objects.all(), write_only=True
    )

    # Read-only nested display
    applicant = JobSeekerSerializer(read_only=True)
    job = JobSerializer(read_only=True)

    class Meta:
        model = JobApplication
        fields = [
            'id', 'job', 'job_id', 'applicant', 'applicant_id',
            'cover_letter', 'resume', 'status', 'applied_at', 'updated_at'
        ]
