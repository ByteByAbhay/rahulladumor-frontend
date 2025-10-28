import React from 'react';
import { personalInfo } from '../config/personalInfo';

/**
 * AuthorSchema Component
 * 
 * Implements E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * signals through structured data for better SEO and credibility.
 * 
 * Usage:
 * <AuthorSchema /> - Default author schema
 * <AuthorSchema type="article" articleData={...} /> - For blog posts
 */
const AuthorSchema = ({ type = 'person', articleData = null }) => {
  
  // Base author/person schema with E-E-A-T signals
  const generatePersonSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.rahulladumor.in/#person",
      "name": personalInfo.name || "Rahul Ladumor",
      "givenName": "Rahul",
      "familyName": "Ladumor",
      "url": "https://www.rahulladumor.in/",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.rahulladumor.in/assets/images/profile.avif",
        "width": 400,
        "height": 400,
        "caption": "Rahul Ladumor - AWS Solutions Architect & 4x Community Builder"
      },
      
      // Professional Identity
      "jobTitle": "AWS Solutions Architect & Cloud Consultant",
      "description": "4x AWS Community Builder with 8+ years of experience specializing in serverless architecture, cloud cost optimization, and AI/ML integration on AWS. Expert in reducing AWS costs by 30-60% while improving performance and scalability.",
      
      // Contact Information
      "email": personalInfo.email || "contact@acloudwithrahul.in",
      "telephone": personalInfo.phone || "+91-9586661233",
      
      // Social Proof & Authority
      "sameAs": [
        personalInfo.social?.linkedin || "https://www.linkedin.com/in/rahulladumor",
        personalInfo.social?.github || "https://github.com/Rahulladumor",
        personalInfo.social?.twitter || "https://twitter.com/Rahul__ladumor",
        "https://dev.to/rahulladumor",
        "https://medium.com/@rahulladumor",
        "https://community.aws" // AWS Community Builder profile
      ],
      
      // Expertise & Skills (E-E-A-T: Expertise)
      "knowsAbout": [
        "AWS Cloud Architecture",
        "Serverless Computing",
        "AWS Lambda",
        "Amazon EventBridge",
        "Cost Optimization",
        "FinOps",
        "DevOps Automation",
        "CI/CD Pipelines",
        "Infrastructure as Code",
        "Terraform",
        "AWS CDK",
        "Kubernetes",
        "Amazon ECS",
        "Amazon EKS",
        "API Gateway",
        "DynamoDB",
        "CloudFormation",
        "LLM Integration",
        "AI/ML on AWS",
        "Amazon Bedrock",
        "LangChain",
        "Cloud Security",
        "DevSecOps"
      ],
      
      // Credentials & Certifications (E-E-A-T: Authoritativeness)
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AWS Community Builder (Serverless)",
          "description": "4x AWS Community Builder recognition for contributions to the serverless community",
          "credentialCategory": "Community Recognition",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Amazon Web Services",
            "url": "https://aws.amazon.com"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AWS Certified Solutions Architect",
          "credentialCategory": "Professional Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Amazon Web Services"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AWS Certified Developer",
          "credentialCategory": "Professional Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Amazon Web Services"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "PG Certificate in Agentic AI",
          "credentialCategory": "Academic Credential",
          "educationalLevel": "Postgraduate",
          "recognizedBy": {
            "@type": "CollegeOrUniversity",
            "name": "IIT Roorkee"
          }
        }
      ],
      
      // Current Employment (E-E-A-T: Experience)
      "worksFor": [
        {
          "@type": "Organization",
          "name": "ASTM International",
          "url": "https://www.astm.org",
          "description": "Senior Cloud Engineer"
        },
        {
          "@type": "Organization",
          "name": "Turing",
          "url": "https://www.turing.com",
          "description": "Cloud Solutions Architect"
        }
      ],
      
      // Education
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": personalInfo.education?.[0]?.institution || "Engineering College"
      },
      
      // Professional Achievements (E-E-A-T: Experience)
      "award": [
        "AWS Community Builder (4x)",
        "Distinguished Alumni Recognition",
        "200+ Engineers Mentored"
      ],
      
      // Location
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      
      // Aggregate Rating (E-E-A-T: Trustworthiness)
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  };

  // Article schema with author attribution (for blog posts)
  const generateArticleSchema = () => {
    if (!articleData) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": articleData.url || "https://www.rahulladumor.in/blogs",
      "headline": articleData.title || "AWS Cloud Consulting Article",
      "description": articleData.description || "",
      "image": articleData.image || "https://www.rahulladumor.in/assets/images/profile.avif",
      "datePublished": articleData.datePublished || new Date().toISOString(),
      "dateModified": articleData.dateModified || articleData.datePublished || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleData.url || "https://www.rahulladumor.in/blogs"
      },
      
      // Author Attribution (Critical for E-E-A-T)
      "author": {
        "@type": "Person",
        "@id": "https://www.rahulladumor.in/#person",
        "name": "Rahul Ladumor",
        "url": "https://www.rahulladumor.in/about",
        "image": "https://www.rahulladumor.in/assets/images/profile.avif",
        "jobTitle": "AWS Solutions Architect & Cloud Consultant",
        "description": "4x AWS Community Builder specializing in serverless architecture and cloud cost optimization",
        "sameAs": [
          "https://www.linkedin.com/in/rahulladumor",
          "https://github.com/Rahulladumor",
          "https://twitter.com/Rahul__ladumor"
        ]
      },
      
      // Publisher (Organization)
      "publisher": {
        "@type": "Organization",
        "name": "Rahul Ladumor - AWS Cloud Consulting",
        "url": "https://www.rahulladumor.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.rahulladumor.in/assets/images/profile.avif",
          "width": 400,
          "height": 400
        }
      },
      
      // Article Metadata
      "articleSection": articleData.category || "AWS Cloud Computing",
      "keywords": articleData.keywords || ["AWS", "Cloud Computing", "Serverless", "Cost Optimization"],
      "wordCount": articleData.wordCount || 1500,
      "timeRequired": articleData.readTime || "PT8M", // ISO 8601 duration format
      
      // Engagement Metrics (if available)
      ...(articleData.commentCount && {
        "commentCount": articleData.commentCount
      }),
      
      // Related Content
      ...(articleData.relatedArticles && {
        "relatedLink": articleData.relatedArticles
      })
    };
  };

  // Organization schema for brand authority
  const generateOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.rahulladumor.in/#organization",
      "name": "Rahul Ladumor - AWS Cloud Consulting",
      "alternateName": "A Cloud With Rahul",
      "url": "https://www.rahulladumor.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.rahulladumor.in/assets/images/profile.avif",
        "width": 400,
        "height": 400
      },
      "description": "Expert AWS cloud consulting services specializing in cost optimization, serverless architecture, and DevOps automation. Helping startups and enterprises reduce AWS costs by 30-60%.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.rahulladumor.in/#person",
        "name": "Rahul Ladumor"
      },
      "sameAs": [
        "https://www.linkedin.com/in/rahulladumor",
        "https://github.com/Rahulladumor",
        "https://twitter.com/Rahul__ladumor"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": personalInfo.phone || "+91-9586661233",
        "contactType": "Customer Service",
        "email": personalInfo.email || "contact@acloudwithrahul.in",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      }
    };
  };

  // Determine which schema(s) to render
  const getSchemaData = () => {
    switch (type) {
      case 'article':
        return [generatePersonSchema(), generateArticleSchema()].filter(Boolean);
      case 'organization':
        return [generateOrganizationSchema()];
      case 'all':
        return [generatePersonSchema(), generateOrganizationSchema()];
      case 'person':
      default:
        return [generatePersonSchema()];
    }
  };

  const schemas = getSchemaData();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  );
};

export default AuthorSchema;
