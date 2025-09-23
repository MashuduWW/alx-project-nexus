#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Build Tailwind
npm install
npx tailwindcss -i ./hirespot/static/hirespot/css/styles.css -o ./hirespot/static/hirespot/css/output.css --minify

# Collect Django static files
python manage.py collectstatic --noinput
