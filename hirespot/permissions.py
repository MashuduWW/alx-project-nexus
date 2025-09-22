from rest_framework import permissions

class IsRecruiterOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # SAFE_METHODS: GET, HEAD, OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only authenticated users with a recruiter profile can write
        return request.user and hasattr(request.user, "recruiter_profile")
