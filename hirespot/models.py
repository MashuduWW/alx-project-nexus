from django.db import models
from django.contrib.auth.models import User


# -----------------------------
# Recruiter Model
# -----------------------------

class Recruiter(models.Model):
    COMPANY_SIZE_CHOICES = [
        ("1-10", "1-10 employees"),
        ("11-50", "11-50 employees"),
        ("51-200", "51-200 employees"),
        ("201-500", "201-500 employees"),
        ("501-1000", "501-1000 employees"),
        ("1001+", "1001+ employees"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="recruiter_profile", null=True, blank=True)
    company_name = models.CharField(max_length=255)
    company_size = models.CharField(max_length=20, choices=COMPANY_SIZE_CHOICES, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.username})"



# -----------------------------
# Jobseeker Model
# -----------------------------


class JobSeeker(models.Model):
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other"),
        ("prefer_not_say", "Prefer not to say"),
    ]
    ETHNICITY_CHOICES = [
        ("asian", "Asian"),
        ("black", "Black / African"),
        ("hispanic", "Hispanic / Latino"),
        ("white", "White"),
        ("mixed", "Mixed"),
        ("other", "Other"),
        ("prefer_not_say", "Prefer not to say"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="jobseeker_profile", null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True, null=True)
    ethnicity = models.CharField(max_length=30, choices=ETHNICITY_CHOICES, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    cell_number = models.CharField(max_length=20, blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.username})"


# -----------------------------
# Job Model
# -----------------------------

class Job(models.Model):
    JOB_TYPES = [
        ("full_time", "Full-time"),
        ("part_time", "Part-time"),
        ("contract", "Contract"),
        ("internship", "Internship"),
        ("temporary", "Temporary"),
        ("remote", "Remote"),
    ]

    EXPERIENCE_LEVELS = [
        ("entry", "Entry"),
        ("mid", "Mid"),
        ("senior", "Senior"),
        ("lead", "Lead"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    company_name = models.CharField(max_length=255)
    posted_by = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name="jobs")
    location = models.CharField(max_length=255, blank=True, null=True)
    job_type = models.CharField(max_length=50, choices=JOB_TYPES)
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    currency = models.CharField(max_length=10, default="USD")
    requirements = models.TextField(blank=True, null=True)
    benefits = models.TextField(blank=True, null=True)
    experience_level = models.CharField(max_length=50, choices=EXPERIENCE_LEVELS, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    posted_at = models.DateTimeField(auto_now_add=True)
    closing_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company_name}"



# -----------------------------
# Job Application Model
# -----------------------------
class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("reviewed", "Reviewed"),
        ("interview", "Interview"),
        ("offered", "Offered"),
        ("rejected", "Rejected"),
    ]

    job = models.ForeignKey("Job", on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, related_name="applications")
    cover_letter = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to="applications/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.applicant.user.username} -> {self.job.title}"