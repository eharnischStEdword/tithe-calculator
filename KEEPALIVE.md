# Keep-Alive Setup for Render Free Tier

## The Problem
Render free tier spins down after 15 minutes of inactivity. Code alone cannot fix this.

## The Solution
Use a free external service to ping your app every 10-14 minutes.

## Setup (Choose One)

### Option 1: Cron-job.org (Recommended)
1. Go to https://cron-job.org
2. Sign up (free)
3. Create new cronjob
4. URL: https://tithe-calculator.onrender.com/health
5. Interval: Every 10 minutes
6. Save

### Option 2: UptimeRobot
1. Go to https://uptimerobot.com
2. Sign up (free)
3. Add New Monitor
4. Type: HTTP(s)
5. URL: https://tithe-calculator.onrender.com/health
6. Interval: 5 minutes
7. Create Monitor

## Verification
- Check Render logs to see regular ping traffic
- Site should stay active 24/7
