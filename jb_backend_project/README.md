  # Job Board Backend - HireSpot

The Job Board Backend is a robust backend system designed with Django and Django REST Framework (DRF) to power job platforms that require complex role management, secure authentication, and efficient data retrieval.
It provides RESTful (or GraphQL, if preferred) APIs to manage users, companies, jobs, applications, and permissions. The project focuses on complex role management, secure authentication, and efficient data retrieval, making it suitable for platforms where multiple user roles (e.g., admins, employers, job seekers) interact seamlessly.




## Features

- User Authentication & Authorization

	- JWT-based authentication (via djangorestframework-simplejwt).
	- Role-based access control (Admin, Employer, Job Seeker, etc.).
	- Support for permission granularity (e.g., who can post/edit jobs, manage applicants, etc.).
	- Secure password hashing and reset flow.

- Job Management

	- Employers can create, update, and delete job postings.
	- Job seekers can browse, search, and filter jobs efficiently.
	- Advanced search capabilities with filtering (by title, company, skills, salary, etc.).

- Application Management

	- Job seekers can apply for jobs.
	- Employers can manage and track applications.
	- Notification support for application status updates.

- Company Profiles

	- Employers can manage their company details.
	- Public profiles display open roles, culture, and information.

- Scalable Data Retrieval

	- Optimized queries with indexing and caching.
	- Pagination and filtering for job listings and applications.

- Admin Dashboard APIs

	- Manage all users, companies, and job listings.

- Role and permission management.

	- Analytics endpoints for system insights.

## Tech Stack

- Backend Framework: Django, Django REST Framework
- Database: PostgreSQL (primary), Redis (caching)
- Authentication: JWT (SimpleJWT)
- Search & Filtering: PostgreSQL full-text search 
- Testing: Unit tests & Integration tests



## Project Structure 

alx-project-nexus/
│── manage.py
│── .env
│
├── jb_backend_project/              # Global Django backend project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── hirespot/                 # App
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── permissions.py
│   ├── tests.py
│   └── urls.py
|
├── documents/              # Global project settings
│   ├── entites.pdf
│   ├── roadmap.pdf
│   └── ERD.txt
│── requirements.txt
│── render.yaml
│── build.sh
│── runtime.txt
└── README.md               






## Installation & Setup

1. Clone Repository
git clone https://github.com/MashuduWW/alx-project-nexus.git
cd job-board-backend

2. Create & Activate Virtual Environment
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

3. Install Dependencies
pip install -r requirements.txt

4. Environment Variables


DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1

## Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=job_board
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432

## JWT
ACCESS_TOKEN_LIFETIME=10
REFRESH_TOKEN_LIFETIME=60

5. Run Migrations
python manage.py migrate

6. Create Superuser
python manage.py createsuperuser

7. Start Development Server
python manage.py runserver

## API Endpoints 

Overview:
https://alx-project-nexus-1s9k.onrender.com

For a full list of endpoints, please visit:

https://alx-project-nexus-1s9k.onrender.com/api/docs/


### Authentication

POST /api/auth/login/ – JWT login

POST /api/auth/refresh/ – Refresh token

### Jobs

GET /api/jobs/ – List jobs (with filters, pagination)

POST /api/jobs/ – Create job (employer only)

GET /api/jobs/{id}/ – Job detail

### Applications

POST /api/applications/ – Apply for a job

GET /api/applications/ – View user applications

## Running Tests
python manage.py test



### Deployment 

#### Vercel 
```bash
Deploy platform:
https://dashboard.render.com/

Project link:
https://alx-project-nexus-1s9k.onrender.com
```

## Future Improvements

Email notifications (job updates, application status).

Advanced analytics for employers (applicant stats).

Resume upload and parsing.

WebSocket support for real-time notifications.


## License

MIT License – free to use and modify.



Built by **Mashudu Molema** as part of the ALX Full Stack Engineering Program © 2025
