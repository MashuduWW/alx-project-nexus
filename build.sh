#!/usr/bin/env bash
set -o errexit

# Install Python deps
pip install -r requirements.txt

# Install Node deps and build Tailwind
npm install
npm run build

# Collect static files
python manage.py collectstatic --noinput
