#!/usr/bin/env bash
# Exit on any error
set -e

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Collecting Django static files..."
python manage.py collectstatic --noinput

echo "Build complete!"
