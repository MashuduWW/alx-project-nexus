# HireSpot - BackEnd and FronEnd

## Project Overview
HireSpot is a dynamic web application designed to streamline the process of connecting job seekers with potential employers. It provides a centralized hub where companies can post job openings and candidates can search, filter, and apply for positions that match their skills and interests.

The platform is built with a focus on user experience, offering intuitive navigation, powerful search functionality, and a responsive design that works seamlessly across all devices.

The project is separated in to 2 sections, front-end and back-end named hirespot front-end and hirespot back-end respectively.




## Features

### For Employers

Company registration & profile management

Post, update, and manage job listings

View applicants and manage applications

### For Job Seekers

User registration & profile creation (resume, skills, experience)

Search and filter jobs by category, location, and keywords

Apply to jobs and track application status

## General

- Authentication & authorization

- Responsive design (mobile & desktop friendly)

- RESTful API for scalability and integrations

- Admin dashboard for managing users, jobs, and reports

### Tech Stack

Frontend: React / Next.js (with Tailwind CSS for styling)

Backend: Django / Django REST Framework (or Node.js if you choose JS stack)

Database: PostgreSQL (or MySQL / SQLite for development)

Authentication: JWT or session-based authentication

Deployment: Docker, CI/CD pipeline, and cloud hosting (AWS / Vercel / Netlify / Render)

## Project Structure
job-board-platform/

├── backend/       
├── frontend    
├── docs/         
├── tests/            
└── README.md 


## Installation & Setup
### Prerequisites

Node.js >= 18

Python >= 3.13

PostgreSQL 

Git & GitHub

Pythonanywhere & Vercel

**Clone the repo**

git clone https://github.com/MashuduWW/alx-project-nexus.git
cd job-board-platform

**Backend Setup**

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

**Frontend Setup**
cd frontend
npm install
npm run dev


**Access the app at:**

 Frontend: http://localhost:3000

 Backend API: http://localhost:8000

## Testing

**Run backend tests:**

cd backend
pytest


**Run frontend tests:**

cd frontend
npm run test

## Roadmap

 Job recommendations 

 Email notifications for applications & updates

 Role-based access control

 Analytics for employers

 Resume builder for job seekers

## Contribution

Thank you for your interest!
This project was developed as part of a school assignment, so external contributions are not being accepted at the moment.

## License

This project is for educational purposes only and is not licensed for external use or redistribution.


Author: **Mashudu Molema**
