# Tithe Calculator for St. Edward Parish

A simple web calculator to help parishioners understand their giving as a percentage of income and visualize what increased giving would look like weekly.

## Features

- Enter annual giving statement total OR typical weekly offering
- Calculate current giving percentage
- See weekly amounts for 1-5% increases in giving
- Clean, mobile-friendly interface

## Tech Stack

- Flask (Python web framework)
- Vanilla JavaScript
- HTML/CSS

## Local Development

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run locally:
   ```bash
   python app.py
   ```

4. Open browser to `http://localhost:5000`

## Deployment to Render

1. Create new GitHub repository and push code
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Render will auto-detect render.yaml and deploy

## Project Structure

- `app.py` - Flask server
- `templates/index.html` - Main calculator page
- `static/script.js` - Calculator logic
- `static/style.css` - Styling
- `requirements.txt` - Python dependencies
- `render.yaml` - Render deployment config
