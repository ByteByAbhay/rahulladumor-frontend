# Quick SEO Deployment Commands

## 🚀 Deploy to AWS S3 + CloudFront

### 1. Build Your Site
```bash
npm run build
```

### 2. Upload to S3 (Replace YOUR_BUCKET_NAME)
```bash
BUCKET_NAME="your-bucket-name"

# Upload sitemap
aws s3 cp public/sitemap.xml s3://$BUCKET_NAME/sitemap.xml \
  --content-type "application/xml" \
  --cache-control "public, max-age=3600" \
  --acl public-read

# Upload robots.txt
aws s3 cp public/robots.txt s3://$BUCKET_NAME/robots.txt \
  --content-type "text/plain" \
  --cache-control "public, max-age=3600" \
  --acl public-read
```

### 3. Invalidate CloudFront (Replace YOUR_DIST_ID)
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/sitemap.xml" "/robots.txt"
```

### 4. Verify Files
```bash
# Test sitemap
curl https://www.rahulladumor.in/sitemap.xml

# Test robots.txt
curl https://www.rahulladumor.in/robots.txt
```

---

## 📊 Google Search Console Setup

### Step 1: Add Property
1. Go to: https://search.google.com/search-console/
2. Click "Add Property"
3. Enter: `rahulladumor.in` (Domain) or `https://www.rahulladumor.in` (URL-prefix)

### Step 2: Verify Ownership
**Option A: DNS (Domain property)**
```
Add TXT record to DNS:
Type: TXT
Name: @
Value: google-site-verification=XXXXXXXXX
```

**Option B: HTML Tag (URL-prefix)**
```html
<!-- Already in your code -->
<meta name="google-site-verification" content="YOUR_CODE" />
```

### Step 3: Submit Sitemap
1. Go to: Sitemaps → Add new sitemap
2. Enter: `sitemap.xml`
3. Click "Submit"

---

## ✅ Your Files (Already Created)

### Sitemap.xml
```
Location: /public/sitemap.xml
URL: https://www.rahulladumor.in/sitemap.xml
Pages: 7 (Homepage, Services, About, Contact, Booking, Reviews, Blogs)
```

### Robots.txt
```
Location: /public/robots.txt
URL: https://www.rahulladumor.in/robots.txt
Status: Allows all crawlers, references sitemap
```

### GA4 Tracking
```
Status: ✅ Already configured
File: /components/GoogleAnalytics.jsx
Strategy: lazyOnload (non-blocking)
```

---

## 🔍 Test Your SEO

### Online Tools
```
Google Search Console: https://search.google.com/search-console/
PageSpeed Insights: https://pagespeed.web.dev/
Sitemap Validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html
Robots.txt Tester: https://support.google.com/webmasters/answer/6062598
```

### Command Line
```bash
# Check sitemap
curl -I https://www.rahulladumor.in/sitemap.xml

# Check robots.txt
curl -I https://www.rahulladumor.in/robots.txt

# Check if indexed by Google
site:rahulladumor.in
```

---

## 📈 Monitor Performance

### Google Analytics 4
```
URL: https://analytics.google.com/
Reports → Realtime (immediate)
Reports → Engagement → Pages (24-48 hours)
Reports → Engagement → Web Vitals (24-48 hours)
```

### Google Search Console
```
URL: https://search.google.com/search-console/
Sitemaps: Check submission status
Performance: View clicks, impressions, CTR
Coverage: Check indexed pages
```

---

## 🎯 Success Metrics

### Immediate (0-24 hours)
- ✅ Sitemap accessible
- ✅ Robots.txt accessible
- ✅ GA4 tracking active
- ✅ Search Console verified

### Short-term (1-7 days)
- ✅ Sitemap processed by Google
- ✅ Pages discovered
- ✅ Core Web Vitals data appearing

### Long-term (1-3 months)
- ✅ Pages indexed
- ✅ Organic traffic growing
- ✅ Rankings improving
- ✅ Core Web Vitals: Good

---

## 🆘 Quick Fixes

### Sitemap 404
```bash
aws s3api put-object-acl --bucket YOUR_BUCKET --key sitemap.xml --acl public-read
```

### CloudFront Cache Issue
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Search Console Not Fetching
1. Check file is public
2. Invalidate CloudFront cache
3. Wait 24 hours
4. Resubmit sitemap

---

## 📞 Support

- AWS Support: https://console.aws.amazon.com/support/
- Google Search Console Help: https://support.google.com/webmasters/
- Next.js Docs: https://nextjs.org/docs

---

**Your site is SEO-ready! 🎉**
