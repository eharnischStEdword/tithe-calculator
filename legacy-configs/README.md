# Legacy Deployment Configurations

This folder contains deployment configurations from previous hosting attempts that are no longer used.

## Files in this folder:

### passenger_wsgi.py
- **Purpose:** Passenger WSGI adapter for shared hosting (cPanel/Passenger)
- **Status:** Legacy - Not used on Render
- **Original Use:** cPanel shared hosting with Passenger
- **Why Archived:** App is now deployed on Render using Gunicorn

### .htaccess
- **Purpose:** Apache web server configuration
- **Status:** Legacy - Not used on Render
- **Original Use:** Apache/cPanel shared hosting
- **Why Archived:** Render uses its own infrastructure, not Apache

## Current Active Deployment

The app is currently deployed on **Render** using:
- `render.yaml` - Render deployment configuration
- `gunicorn` - WSGI server (specified in render.yaml)
- `app.py` - Flask application entry point

## Migration History

1. **Original:** Shared hosting with cPanel/Passenger
2. **Current:** Render cloud platform with Gunicorn
3. **Future:** No planned changes

These legacy files are kept for reference in case migration back to shared hosting is ever needed, but they are not used in the current deployment.
