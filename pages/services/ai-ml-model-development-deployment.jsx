import React from "react";
import MainLayout from "../../components/ui/MainLayout";
import MetaHead from "../../components/MetaHead";
import ServiceHero from "../../components/services/ServiceHero";
import ServiceBenefits from "../../components/services/ServiceBenefits";
import ServiceProcess from "../../components/services/ServiceProcess";
import ServiceTools from "../../components/services/ServiceTools";
import ServiceCTA from "../../components/services/ServiceCTA";
import TestimonialsSection from "../../components/aws-cloud-consulting-mentorship-landing-page/TestimonialsSection";
import { fetchProfileData } from "../../services/profileService";
import {
  servicePages,
  pageSEO,
  seo as localSeo,
} from "../../config/personalInfo";

export default function AiMlModelDevelopmentDeploymentPage({ profileData }) {
  const serviceData = servicePages["ai-ml-model-development-deployment"];

  // Merge page-specific SEO with global verification codes
  const seo = {
    ...pageSEO.aiMlModelDevelopmentDeployment,
    googleVerification: localSeo.googleVerification,
    bingVerification: localSeo.bingVerification,
    pinterestVerification: localSeo.pinterestVerification,
  };

  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />

      {/* Hero Section */}
      <ServiceHero service={serviceData} />

      {/* Key Benefits Section */}
      <ServiceBenefits benefits={serviceData.benefits} />

      {/* Process Section */}
      <ServiceProcess process={serviceData.process} />

      {/* Tools & Technologies Section */}
      <ServiceTools tools={serviceData.tools} />

      {/* Testimonials Section */}
      <TestimonialsSection profileData={profileData} />

      {/* CTA Section */}
      <ServiceCTA service={serviceData} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  try {
    const profileData = await fetchProfileData();

    return {
      props: {
        profileData,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);

    // Return fallback data to prevent build failure
    return {
      props: {
        profileData: {
          heroSection: {},
          problemSection: {},
          solutionSection: {},
          credentialsSection: {},
          servicesSection: {},
          testimonialsSection: {},
          caseStudiesSection: {},
          aboutSection: {},
          contactSection: {},
        },
      },
      revalidate: 3600,
    };
  }
}
