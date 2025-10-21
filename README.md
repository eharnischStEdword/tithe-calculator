# Tithe Calculator

A web-based calculator that helps parishioners understand their giving as a percentage of household income and visualize increased giving scenarios.

## 🌐 Live Demo

**[https://tithe-calculator.onrender.com/](https://tithe-calculator.onrender.com/)**

> ⚠️ **Note:** Free hosting means the app may take 30-50 seconds to load on first visit. Subsequent visits are instant.

## ✅ Features

- **Flexible Input:** Enter offering amounts in weekly, bi-weekly, monthly, or annual frequencies
- **Income Calculation:** Input household income in any frequency
- **Percentage Analysis:** See current giving as percentage of income
- **Increase Scenarios:** Visualize 1-5% increases with specific dollar amounts
- **Summary Breakdown:** View annual, monthly, and weekly giving/income totals
- **Mobile-Friendly:** Responsive design works on all devices
- **Accessibility:** Screen reader compatible with proper ARIA labels

## ⚙️ Tech Stack

- **Backend:** Flask 3.0.0 (Python web framework)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Deployment:** Render (WSGI with Gunicorn)
- **Dependencies:** Minimal - only Flask and Gunicorn

## 🚀 Local Development

### Prerequisites
- Python 3.8 or higher
- Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tithe-calculator.git
   cd tithe-calculator
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Open in browser:**
   ```
   http://localhost:5001
   ```

### Development Notes
- The app runs on port 5001 by default
- All calculations happen client-side in JavaScript
- No database required - completely stateless

## 📁 Project Structure

```
tithe-calculator/
├── app.py                 # Flask server with 3 routes (/, /health, /status)
├── requirements.txt       # Python dependencies (Flask, Gunicorn)
├── render.yaml           # Render deployment configuration
├── templates/
│   └── index.html        # Main calculator interface
├── static/
│   ├── script.js         # Calculator logic and validation
│   └── style.css         # Responsive styling and accessibility
├── DEPLOYMENT.md         # Detailed Render deployment guide
├── KEEPALIVE.md          # Free tier optimization guide
└── README.md             # This file
```

## 🚀 Deployment to Render

### Quick Deploy (Recommended)

1. **Fork this repository** on GitHub
2. **Create new Web Service** on [Render](https://render.com)
3. **Connect your GitHub repository**
4. **Render auto-detects** `render.yaml` and deploys automatically

### Manual Configuration

If auto-detection fails, use these settings:

- **Environment:** Python
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 60`

### Environment Variables

No environment variables required. The app uses:
- `PORT` (automatically set by Render)
- Default fallback port: 5001

## 👥 Usage

### For Parishioners

1. **Enter Offering Amount:** Type your typical offering (weekly, monthly, etc.)
2. **Select Frequency:** Choose how often you give (weekly, bi-weekly, monthly, annually)
3. **Enter Income:** Input your household income amount
4. **Select Income Frequency:** Choose how often you receive income
5. **View Results:** See your current giving percentage and increase scenarios

### For Parish Staff

- **Share the URL:** Direct parishioners to the live calculator
- **Bulletin Announcement:** "Calculate your giving percentage at [URL]"
- **Website Integration:** Link from parish website or giving page

## 🔧 Configuration

### Free Tier Limitations

- **Spin-down:** App sleeps after 15 minutes of inactivity
- **Cold Start:** 30-50 second load time on first visit
- **Monthly Hours:** 750 hours runtime (plenty for parish use)

### Upgrading to Paid ($7/month)

Benefits of paid tier:
- Always-on (no spin-down)
- Faster response times
- Custom domain support
- More memory and resources

## 🛠️ Troubleshooting

### Common Render Issues

**App won't load after 60 seconds:**
1. Check Render dashboard for service status
2. Look at Events tab for build errors
3. Check Logs tab for runtime errors

**Build fails:**
- Verify `requirements.txt` contains exactly:
  ```
  Flask==3.0.0
  gunicorn==21.2.0
  ```

**App crashes after build:**
- Check logs for port binding issues
- Verify all file references exist
- Ensure no syntax errors in Python code

**Memory issues:**
- Free tier limit: 512MB
- This app uses ~100MB
- Consider upgrading if hitting limits

### Local Development Issues

**Port already in use:**
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear pip cache
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

## 📞 Contributing & Contact

### For Developers

- **Issues:** Report bugs or suggest features via GitHub Issues
- **Pull Requests:** Welcome improvements to code or documentation
- **Fork:** Feel free to adapt for your own parish

### For Parish Staff

- **Questions:** Contact your parish IT coordinator
- **Customization:** Modify colors, text, or calculations as needed
- **Support:** See `DEPLOYMENT.md` for detailed deployment help

---

**Built for St. Edward Parish** | **Deployed on Render** | **Open Source**