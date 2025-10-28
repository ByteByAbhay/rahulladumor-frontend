import React from 'react';
import { personalInfo } from '../config/personalInfo';

const StructuredData = ({ type = 'consulting', pageData = {} }) => {
  const generateConsultingServiceSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://acloudwithrahul.in/#consulting-service",
      "name": "AWS Cloud Consulting & Mentorship Services",
      "alternateName": "A Cloud With Rahul - AWS Solutions Architecture",
      "description": "Expert AWS cloud consulting, cost optimization, serverless architecture, and DevOps mentorship services. Specializing in reducing AWS costs by 30-60% while improving performance and reliability.",
      "url": "https://acloudwithrahul.in",
      "logo": "https://acloudwithrahul.in/assets/images/profile.avif",
      "image": "https://acloudwithrahul.in/assets/images/profile.avif",
      "telephone": personalInfo.phone || "+91-XXXXXXXXXX",
      "email": personalInfo.email || "contact@acloudwithrahul.in",
      "priceRange": "₹₹-₹₹₹",
      "currenciesAccepted": "INR, USD",
      "paymentAccepted": "Bank Transfer, UPI, PayPal, Stripe",
      
      "provider": {
        "@type": "Person",
        "@id": "https://acloudwithrahul.in/#person",
        "name": personalInfo.name || "Rahul Ladumor",
        "jobTitle": "AWS Solutions Architect & Cloud Consultant",
        "description": "AWS Community Builder with 8+ years of experience in cloud architecture, cost optimization, and DevOps automation. Specialized in serverless architectures, LLM integration, and AWS FinOps.",
        "url": "https://acloudwithrahul.in",
        "image": "https://acloudwithrahul.in/assets/images/profile.avif",
        "email": personalInfo.email,
        "telephone": personalInfo.phone,
        "sameAs": [
          personalInfo.social?.linkedin || "https://www.linkedin.com/in/rahulladumor",
          personalInfo.social?.github || "https://github.com/rahulladumor",
          personalInfo.social?.twitter || "https://twitter.com/rahulladumor"
        ],
        "knowsAbout": [
          "AWS Cloud Architecture",
          "Cost Optimization",
          "Serverless Computing",
          "DevOps Automation",
          "Infrastructure as Code",
          "AWS Lambda",
          "Amazon EventBridge",
          "Terraform",
          "Kubernetes",
          "CI/CD Pipelines",
          "LLM Integration",
          "AWS FinOps"
        ],
        "hasCredential": [
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
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": personalInfo.education?.[0]?.institution || "Educational Institution"
        },
        "worksFor": [
          {
            "@type": "Organization",
            "name": "ASTM International",
            "url": "https://www.astm.org"
          },
          {
            "@type": "Organization",
            "name": "Turing",
            "url": "https://www.turing.com"
          }
        ]
      },

      "areaServed": {
        "@type": "Place",
        "name": "Worldwide",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ahmedabad",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      },

      "serviceType": "Cloud Consulting",
      "serviceOutput": [
        "AWS Cost Optimization",
        "Cloud Architecture Design",
        "DevOps Implementation",
        "Serverless Solutions",
        "Technical Mentorship"
      ],

      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AWS Consulting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AWS Cost Optimization Audit",
              "description": "Comprehensive AWS infrastructure audit to identify cost savings opportunities. Guaranteed 30-60% cost reduction.",
              "serviceType": "Cost Optimization"
            },
            "price": "25000",
            "priceCurrency": "INR",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://acloudwithrahul.in/services"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 AWS Mentorship Program",
              "description": "Personalized AWS learning path with hands-on projects, interview preparation, and career guidance.",
              "serviceType": "Technical Mentorship"
            },
            "price": "15000",
            "priceCurrency": "INR",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://acloudwithrahul.in/services"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AWS Architecture Consulting",
              "description": "Expert guidance on serverless architecture, microservices, and cloud-native solutions.",
              "serviceType": "Architecture Consulting"
            },
            "price": "50000",
            "priceCurrency": "INR",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://acloudwithrahul.in/services"
          }
        ]
      },

      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      },

      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Client"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Exceptional AWS consulting services. Reduced our cloud costs by 60% while improving performance."
        }
      ],

      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Free Discovery Call",
          "description": "30-minute free consultation to discuss your AWS challenges and goals",
          "price": "0",
          "priceCurrency": "INR",
          "url": "https://acloudwithrahul.in/booking"
        }
      ]
    };
  };

  const generateBreadcrumbSchema = () => {
    const breadcrumbs = pageData.breadcrumbs || [
      { name: "Home", url: "https://acloudwithrahul.in" }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  };

  const generateWebPageSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": pageData.url || "https://acloudwithrahul.in",
      "url": pageData.url || "https://acloudwithrahul.in",
      "name": pageData.title || "AWS Cloud Consulting & Mentorship",
      "description": pageData.description || "Expert AWS consulting services",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://acloudwithrahul.in/#website",
        "url": "https://acloudwithrahul.in",
        "name": "A Cloud With Rahul",
        "publisher": {
          "@type": "Person",
          "name": personalInfo.name || "Rahul Ladumor"
        }
      }
    };
  };

  const generateOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://acloudwithrahul.in/#organization",
      "name": "A Cloud With Rahul",
      "alternateName": "AWS Consulting by Rahul Ladumor",
      "url": "https://acloudwithrahul.in",
      "logo": "https://acloudwithrahul.in/assets/images/profile.avif",
      "description": "Professional AWS cloud consulting and mentorship services",
      "email": personalInfo.email,
      "telephone": personalInfo.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ahmedabad", 
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      "sameAs": [
        personalInfo.social?.linkedin,
        personalInfo.social?.github,
        personalInfo.social?.twitter
      ].filter(Boolean),
      "founder": {
        "@type": "Person",
        "name": personalInfo.name || "Rahul Ladumor"
      }
    };
  };

  const getSchemaData = () => {
    const schemas = [];

    if (type === 'consulting' || type === 'all') {
      schemas.push(generateConsultingServiceSchema());
    }

    if (type === 'breadcrumb' || type === 'all') {
      schemas.push(generateBreadcrumbSchema());
    }

    if (type === 'webpage' || type === 'all') {
      schemas.push(generateWebPageSchema());
    }

    if (type === 'organization' || type === 'all') {
      schemas.push(generateOrganizationSchema());
    }

    return schemas;
  };

  const schemas = getSchemaData();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
