# Quick Start: Adding a New Service Page

## ⚡ 5-Minute Service Page Setup

### Step 1: Add Service Data (2 min)

Open `/config/personalInfo.js` and add your service to the `servicePages` object:

```javascript
"devops-consulting": {  // Your service slug (URL-friendly)
  slug: "devops-consulting",
  title: "DevOps Consulting & Automation",
  subtitle: "Accelerate deployments with CI/CD pipelines and infrastructure automation",
  icon: "GitBranch",  // Any Lucide icon name
  
  stats: [
    { value: "80%", label: "Faster Deployments" },
    { value: "95%", label: "Deployment Success" },
    { value: "50%", label: "Time Saved" },
    { value: "200+", label: "Pipelines Built" }
  ],
  
  benefits: [
    {
      icon: "Zap",
      title: "Rapid Deployments",
      description: "Deploy code to production in minutes, not hours or days.",
      metric: "80% faster"
    },
    // Add 3-5 more benefits
  ],
  
  process: {
    steps: [
      {
        title: "Assessment",
        description: "Evaluate your current CI/CD setup and identify bottlenecks.",
        deliverables: ["Assessment report", "Improvement roadmap"],
        duration: "1 week"
      },
      // Add 2-4 more steps
    ]
  },
  
  tools: {
    categories: [
      {
        name: "CI/CD Tools",
        icon: "GitBranch",
        description: "Automated deployment pipelines",
        items: [
          { name: "GitHub Actions", icon: "Github", description: "CI/CD" },
          { name: "Jenkins", icon: "Settings", description: "Automation" },
        ]
      },
      // Add 2-5 more categories
    ],
    note: "We use the best tools for your specific needs."
  },
  
  whyChooseUs: [
    {
      icon: "Award",
      title: "Expert Team",
      description: "10+ years DevOps experience"
    },
    // Add 2 more reasons
  ],
  
  ctaTitle: "Ready to Automate?",
  ctaDescription: "Let's streamline your deployment process.",
  ctaIcon: "Rocket"
}
```

### Step 2: Add SEO Configuration (1 min)

In the same file, add to the `pageSEO` object:

```javascript
devopsConsulting: {
  title: "DevOps Consulting & Automation Services | CI/CD Experts",
  description: "Professional DevOps consulting services. Automate deployments, implement CI/CD pipelines, and accelerate software delivery with proven expertise.",
  keywords: ["DevOps", "CI/CD", "Automation", "Jenkins", "GitHub Actions"],
  canonicalUrl: "https://www.rahulladumor.in/services/devops-consulting",
  openGraph: {
    title: "DevOps Consulting & Automation Services",
    description: "Automate deployments and accelerate delivery with expert DevOps consulting.",
    url: "https://www.rahulladumor.in/services/devops-consulting",
  }
}
```

### Step 3: Create Page File (2 min)

Copy `/pages/services/cloud-migration-consulting.jsx` to a new file:

```bash
cp pages/services/cloud-migration-consulting.jsx pages/services/devops-consulting.jsx
```

Then update the file:

```javascript
// Change these lines:
export default function DevOpsConsultingPage({ profileData }) {
  const serviceData = servicePages["devops-consulting"];
  
  const seo = {
    ...pageSEO.devopsConsulting,  // Match your SEO key
    googleVerification: localSeo.googleVerification,
    bingVerification: localSeo.bingVerification,
    pinterestVerification: localSeo.pinterestVerification,
  };
  
  // Rest stays the same...
```

### That's It! 🎉

Your new service page is ready at:
```
https://yourdomain.com/services/devops-consulting
```

The page will automatically:
- ✅ Appear on the main /services page
- ✅ Be indexed by search engines
- ✅ Include all sections (Hero, Benefits, Process, Tools, CTA)
- ✅ Be fully responsive
- ✅ Have proper SEO tags
- ✅ Include testimonials
- ✅ Have proper accessibility

## 🧪 Test Your New Service

```bash
# Start dev server
npm run dev

# Visit your page
open http://localhost:3000/services/devops-consulting

# Check main services page
open http://localhost:3000/services

# Build for production
npm run build
npm start
```

## 📝 Content Tips

### Writing Benefits (4-6 items)
Focus on **outcomes**, not features:
- ❌ "We use Jenkins and GitHub Actions"
- ✅ "Deploy 10x faster with automated pipelines"

### Writing Process Steps (3-5 items)
Make it **actionable and clear**:
1. What you'll do
2. What the client gets
3. How long it takes

### Choosing Icons
Browse: https://lucide.dev/icons
Common icons:
- Service: Cloud, Server, Code, Zap, Shield
- Benefits: DollarSign, TrendingUp, Award, Check
- Process: CheckCircle2, Clock, Target
- Tools: Package, Database, GitBranch, Settings

### SEO Optimization
- **Title**: 50-60 characters with main keyword
- **Description**: 150-160 characters with CTA
- **Keywords**: 5-10 relevant terms
- **URL**: Use hyphens, lowercase, descriptive

## 🎨 Customization

### Skip a Section
Remove any component from the page:

```javascript
return (
  <MainLayout profileData={profileData}>
    <MetaHead seo={seo} />
    <ServiceHero service={serviceData} />
    <ServiceBenefits benefits={serviceData.benefits} />
    {/* Skip Process section */}
    <ServiceTools tools={serviceData.tools} />
    <ServiceCTA service={serviceData} />
  </MainLayout>
);
```

### Add Custom Content
Insert custom sections between components:

```javascript
<ServiceBenefits benefits={serviceData.benefits} />

{/* Custom section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2>Custom Content Here</h2>
  </div>
</section>

<ServiceProcess process={serviceData.process} />
```

### Change Order
Reorder components as needed:

```javascript
<ServiceHero service={serviceData} />
<ServiceCTA service={serviceData} />  {/* CTA first */}
<ServiceBenefits benefits={serviceData.benefits} />
<ServiceProcess process={serviceData.process} />
```

## 🐛 Troubleshooting

### Page Not Found (404)
- Check slug matches exactly in all 3 places
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear Next.js cache: `rm -rf .next`

### Missing Data
- Verify service object structure in personalInfo.js
- Check for typos in slug
- Ensure all required fields are present

### SEO Not Working
- Check pageSEO key matches your reference
- Validate title length (50-60 chars)
- Ensure canonical URL is correct

### Icon Not Showing
- Verify icon name at https://lucide.dev/icons
- Check capitalization (e.g., "GitBranch" not "gitbranch")
- Icon must exist in Lucide React

## 🚀 Next Steps

1. **Add Images**: Create hero images for each service
2. **Case Studies**: Add service-specific case studies
3. **FAQs**: Create FAQ section per service
4. **Pricing**: Add service-specific pricing
5. **Forms**: Custom contact forms per service

## 📚 Reference Files

- **Example**: `/pages/services/cloud-migration-consulting.jsx`
- **Components**: `/components/services/*.jsx`
- **Registry**: `/config/serviceRegistry.js`
- **Full Guide**: `/SERVICE_PAGES_IMPLEMENTATION.md`

---

**Pro Tip:** Start with a copy of the cloud-migration-consulting service, then customize the content. This ensures all structure and styling is consistent.
