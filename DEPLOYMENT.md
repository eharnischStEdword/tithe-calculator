# Tithe Calculator - Render Deployment Guide

## Quick Status Check

**Your app should be accessible at:** https://tithe-calculator.onrender.com/

**Test these URLs:**
- Main app: https://tithe-calculator.onrender.com/
- Health check: https://tithe-calculator.onrender.com/health
- Status check: https://tithe-calculator.onrender.com/status

---

## Expected Behavior (Free Tier)

### ✅ Normal Free Tier Behavior:
- **First visit after 15min idle:** 30-50 second wait (spin-up)
- **Subsequent visits:** Instant load (< 1 second)
- **After 15 minutes no traffic:** Spins down again
- **Monthly runtime:** 750 hours (plenty for parish use)

### ⚠️ What Users Will See:
1. **First load:** "This Render service is currently unavailable" for 30-50 seconds
2. **Then:** Normal calculator loads
3. **Subsequent visits:** Instant loading
4. **After 15min idle:** Cycle repeats

**This is normal, not a bug!**

---

## Troubleshooting

### If App Won't Load After 60 Seconds:

1. **Check Render Dashboard:**
   - Go to https://dashboard.render.com
   - Click on `tithe-calculator` service
   - Look for status banner (Green = running, Red = failed)

2. **Check Build Status:**
   - Click "Events" tab
   - Look for recent deploy
   - Check for build errors

3. **Check Runtime Logs:**
   - Click "Logs" tab
   - Look for errors after "Starting service..."

### Common Issues & Fixes:

#### Build Failed
**Symptoms:** Red status, build errors in Events tab
**Likely causes:**
- Wrong Python version
- Missing dependencies
- Syntax errors

**Fix:** Check `requirements.txt` is exactly:
```
Flask==3.0.0
gunicorn==21.2.0
```

#### App Crashes After Build
**Symptoms:** Build succeeds, but app won't start
**Check logs for:**
- `Address already in use` → Port binding issue
- `ModuleNotFoundError` → Import error
- `Application failed to start` → Code error

#### Memory Issues
**Symptoms:** App starts then gets "killed"
**Solutions:**
- Free tier limit is 512MB (this app uses ~100MB)
- If hitting limit, upgrade to paid ($7/month)

---

## Configuration Files

### render.yaml (Optimized)
```yaml
services:
  - type: web
    name: tithe-calculator
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 60
```

### requirements.txt
```
Flask==3.0.0
gunicorn==21.2.0
```

### app.py (Key Parts)
```python
# Port binding (correct)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=False, host='0.0.0.0', port=port)

# Health endpoints
@app.route('/health')
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/status')
def status():
    return jsonify({
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    }), 200
```

---

## Deployment Process

### Automatic Deploy (Recommended)
1. Push changes to GitHub main branch
2. Render auto-deploys within 2-3 minutes
3. Watch Events tab for progress

### Manual Deploy
1. Render dashboard → Manual Deploy
2. Choose "Deploy latest commit"
3. Or "Clear build cache & deploy" for clean build

---

## Monitoring

### Health Monitoring
- **UptimeRobot:** Free service to ping every 5 minutes
- **StatusCake:** Alternative uptime monitoring
- **Note:** These keep your app awake (technically against free tier TOS, but commonly done)

### Log Monitoring
- Check Render dashboard Logs tab regularly
- Look for error patterns
- Memory usage should stay under 200MB

---

## Upgrading to Paid ($7/month)

### Benefits:
- ✅ No spin-down (always-on)
- ✅ Faster response times
- ✅ More memory (2GB+)
- ✅ Better for regular traffic
- ✅ Custom domains
- ✅ Automatic SSL

### When to Upgrade:
- Parish has regular weekly traffic
- Users complain about 30-second wait times
- Need custom domain (e.g., tithe.yourparish.com)
- Want to use uptime monitoring

---

## User Communication

### For Parish Websites:
Add this note to your website:

> **Note:** This calculator may take 30-50 seconds to load on first visit due to free hosting limitations. Subsequent visits will be instant. This is normal behavior, not a technical issue.

### For Church Bulletins:
> **Tithe Calculator Online:** [tithe-calculator.onrender.com](https://tithe-calculator.onrender.com) - Please allow 30 seconds for initial load

---

## Emergency Procedures

### If App Goes Down Completely:
1. Check Render dashboard status
2. If red status, check Events tab for build errors
3. If build succeeded, check Logs tab for runtime errors
4. If all else fails, delete service and recreate (exports settings first!)

### Nuclear Option (Clean Slate):
1. Export environment variables from Settings
2. Delete service in Render
3. Create new Web Service
4. Connect same GitHub repo
5. Re-add environment variables
6. Deploy fresh

---

## Performance Optimization

### Current Optimizations:
- ✅ Gunicorn with 2 workers
- ✅ 60-second timeout
- ✅ Proper port binding
- ✅ Error handling and logging
- ✅ Health check endpoints

### Future Optimizations:
- Static file caching headers
- CDN for static assets
- Database caching (if needed)
- Image optimization (if added)

---

## Cost Analysis

### Free Tier:
- ✅ $0/month
- ✅ 750 hours runtime/month
- ✅ Unlimited deploys
- ⚠️ 15-minute spin-down
- ⚠️ 512MB memory limit

### Paid Tier ($7/month):
- ✅ Always-on
- ✅ 2GB+ memory
- ✅ Custom domains
- ✅ Better performance
- ✅ Priority support

**Recommendation:** Start with free tier. Upgrade if you get 10+ users per week complaining about load times.

---

## Support Resources

- **Render Docs:** https://render.com/docs
- **Flask Deployment:** https://flask.palletsprojects.com/en/3.0.x/deploying/
- **Gunicorn Config:** https://docs.gunicorn.org/en/stable/configure.html

---

*Last updated: December 2024*
*App version: 1.0*
*Render configuration: Optimized for free tier*
