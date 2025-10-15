import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({
    title = "Rahul Ladumor - 4x AWS Community Builder | Serverless Expert | 60% Cost Reduction Specialist",
    description = "4x AWS Community Builder specializing in serverless architecture, DevOps automation, and cost optimization. Saved $2M+ for clients with 30-70% AWS cost reduction. Expert in Lambda, Kubernetes, AI/ML, and enterprise cloud migrations. 200+ engineers mentored.",
    keywords = "AWS Community Builder, serverless architecture, AWS Lambda, cost optimization, DevOps automation, Kubernetes, AI ML, cloud migration, AWS consultant, serverless expert, DevSecOps, CI/CD, microservices, event-driven architecture, AWS certification, cloud architect, fintech security, enterprise consulting",
    image = "/assets/images/profile.avif",
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = "website",
    article = null
}) => {
    const siteUrl = process.env.VITE_APP_URL || 'https://www.rahulladumor.in';
    const fullUrl = url || siteUrl;
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    
    // Enhanced title for better CTR
    const enhancedTitle = title.includes('Rahul Ladumor') ? title : `${title} | Rahul Ladumor - AWS Expert`;

    return (
        <Helmet>
            {/* Enhanced Basic Meta Tags */}
            <title>{enhancedTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Rahul Ladumor" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <meta name="bingbot" content="index, follow" />
            <link rel="canonical" href={fullUrl} />
            
            {/* Enhanced SEO Meta Tags */}
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            <meta name="geo.region" content="IN-GJ" />
            <meta name="geo.placename" content="Surat, Gujarat, India" />
            <meta name="geo.position" content="21.1702;72.8311" />
            <meta name="ICBM" content="21.1702, 72.8311" />

            {/* Enhanced Open Graph Meta Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={enhancedTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:alt" content="Rahul Ladumor - AWS Community Builder and Serverless Expert" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Rahul Ladumor - AWS Expert & Consultant" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:updated_time" content={new Date().toISOString()} />
            {article && (
                <>
                    <meta property="article:author" content="Rahul Ladumor" />
                    <meta property="article:published_time" content={article.publishedTime} />
                    <meta property="article:modified_time" content={article.modifiedTime} />
                    <meta property="article:section" content="Technology" />
                    <meta property="article:tag" content="AWS" />
                    <meta property="article:tag" content="Serverless" />
                    <meta property="article:tag" content="DevOps" />
                </>
            )}

            {/* Enhanced Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={enhancedTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
            <meta name="twitter:image:alt" content="Rahul Ladumor - 4x AWS Community Builder" />
            <meta name="twitter:creator" content="@Rahul__ladumor" />
            <meta name="twitter:site" content="@Rahul__ladumor" />
            <meta name="twitter:domain" content="rahulladumor.in" />

            {/* Enhanced Additional Meta Tags */}
            <meta name="theme-color" content="#1B365D" />
            <meta name="msapplication-TileColor" content="#1B365D" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Rahul Ladumor" />
            <meta name="application-name" content="Rahul Ladumor - AWS Expert" />
            <meta name="msapplication-tooltip" content="AWS Community Builder & Serverless Expert" />
            <meta name="msapplication-starturl" content="/" />
            
            {/* Professional Verification */}
            <meta name="google-site-verification" content="" />
            <meta name="msvalidate.01" content="" />
            <meta name="yandex-verification" content="" />

            {/* Enhanced Structured Data - Multiple Schemas */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Rahul Ladumor",
                    "alternateName": "Rahul L",
                    "jobTitle": "4x AWS Community Builder | Serverless Expert | DevOps Consultant",
                    "description": description,
                    "url": fullUrl,
                    "image": fullImageUrl,
                    "email": "contact@acloudwithrahul.in",
                    "telephone": "+91-7567611653",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Surat",
                        "addressRegion": "Gujarat",
                        "addressCountry": "IN"
                    },
                    "sameAs": [
                        "https://linkedin.com/in/rahulladumor",
                        "https://github.com/Rahulladumor",
                        "https://twitter.com/Rahul__ladumor",
                        "https://www.rahulladumor.in",
                        "https://dev.to/rahulladumor"
                    ],
                    "knowsAbout": [
                        "AWS Lambda",
                        "Serverless Architecture",
                        "DevOps Automation",
                        "Kubernetes",
                        "Cost Optimization",
                        "DevSecOps",
                        "CI/CD Pipelines",
                        "Microservices",
                        "Event-Driven Architecture",
                        "AI/ML Integration",
                        "Cloud Migration",
                        "AWS Security",
                        "Infrastructure as Code",
                        "Node.js",
                        "React.js",
                        "Terraform",
                        "Docker",
                        "AWS API Gateway",
                        "DynamoDB",
                        "CloudFormation"
                    ],
                    "hasCredential": [
                        {
                            "@type": "EducationalOccupationalCredential",
                            "name": "AWS Certified Developer - Associate",
                            "credentialCategory": "Professional Certification",
                            "recognizedBy": {
                                "@type": "Organization",
                                "name": "Amazon Web Services"
                            }
                        },
                        {
                            "@type": "EducationalOccupationalCredential",
                            "name": "AWS Community Builder",
                            "credentialCategory": "Community Recognition",
                            "recognizedBy": {
                                "@type": "Organization",
                                "name": "Amazon Web Services"
                            }
                        }
                    ],
                    "worksFor": {
                        "@type": "Organization",
                        "name": "Independent Consultant",
                        "description": "AWS Cloud Consulting & Enterprise Solutions"
                    },
                    "award": [
                        "4x AWS Community Builder",
                        "$2M+ Client Savings Achievement",
                        "200+ Engineers Mentored"
                    ],
                    "alumniOf": {
                        "@type": "CollegeOrUniversity",
                        "name": "Gujarat Technological University"
                    }
                })}
            </script>
            
            {/* Professional Service Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Rahul Ladumor AWS Consulting",
                    "description": "Expert AWS consulting services specializing in serverless architecture, cost optimization, and DevOps automation",
                    "provider": {
                        "@type": "Person",
                        "name": "Rahul Ladumor"
                    },
                    "areaServed": "Worldwide",
                    "serviceType": [
                        "AWS Cloud Consulting",
                        "Serverless Architecture",
                        "Cost Optimization",
                        "DevOps Automation",
                        "Cloud Migration",
                        "Technical Mentoring"
                    ],
                    "priceRange": "$$",
                    "url": fullUrl,
                    "telephone": "+91-7567611653",
                    "email": "contact@acloudwithrahul.in"
                })}
            </script>
            
            {/* Website Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Rahul Ladumor - AWS Expert",
                    "url": siteUrl,
                    "description": "Professional portfolio and consulting services of Rahul Ladumor, 4x AWS Community Builder",
                    "author": {
                        "@type": "Person",
                        "name": "Rahul Ladumor"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>
            
            {/* Preconnect for Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            
            {/* DNS Prefetch */}
            <link rel="dns-prefetch" href="//linkedin.com" />
            <link rel="dns-prefetch" href="//github.com" />
            <link rel="dns-prefetch" href="//twitter.com" />
            
            {/* Favicon and Icons */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            
        </Helmet>
    );
};

export default SEOHead;