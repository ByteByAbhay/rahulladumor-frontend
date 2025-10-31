# GA4 Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. **Admin** → **Data Streams** → **Web**
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment Variables
Edit your `.env` file:
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```
Replace `G-XXXXXXXXXX` with your actual ID.

### Step 3: Restart & Test
```bash
npm run dev
```
Visit `http://localhost:3000` and check GA4 **Realtime** reports.

---

## ✅ What's Already Configured

- ✅ GA4 tracking scripts in `_document.jsx`
- ✅ Automatic page view tracking
- ✅ Route change tracking
- ✅ Event tracking utilities in `lib/gtag.js`

---

## 🎯 Track Custom Events (Optional)

### Import
```javascript
import * as gtag from 'lib/gtag';
```

### Track Button Click
```javascript
onClick={() => gtag.trackButtonClick('Button Name', 'Section Name')}
```

### Track Form Submit
```javascript
onSubmit={() => gtag.trackFormSubmit('Form Name')}
```

### Track CTA Click
```javascript
onClick={() => gtag.trackCTAClick('CTA Name', 'Section Name')}
```

### Track Link Click
```javascript
onClick={() => gtag.trackLinkClick('Link Name', 'Destination')}
```

---

## 🧪 Verify It's Working

### Method 1: Browser Console
1. Open DevTools → Network tab
2. Filter by `google-analytics.com`
3. Navigate your site
4. Should see requests with `page_view` events

### Method 2: GA4 Realtime
1. Go to GA4 → **Reports** → **Realtime**
2. Navigate your website
3. See active users and page views in real-time

---

## 📋 Production Deployment

### Add to Vercel
1. Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA4_MEASUREMENT_ID` = `G-XXXXXXXXXX`
3. Redeploy

### Add to Other Platforms
Add the environment variable through your hosting platform's dashboard.

---

## 🐛 Troubleshooting

**No data showing?**
- Check Measurement ID is correct
- Wait 24-48 hours for standard reports (use Realtime for instant verification)
- Disable ad blockers
- Check browser console for errors

**Events not tracking?**
- Verify `window.gtag` exists in console
- Check GA4 DebugView for detailed event data
- Ensure tracking code is called

---

## 📚 Full Documentation

See `GA4_SETUP_GUIDE.md` for complete documentation including:
- Detailed setup instructions
- Privacy & GDPR compliance
- Advanced event tracking
- Troubleshooting guide
- Best practices

---

## 🎉 That's It!

Your GA4 tracking is ready. Just add your Measurement ID and start collecting data!
