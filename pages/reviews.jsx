import React from "react";
import MainLayout from "../components/ui/MainLayout";
import TestimonialsSection from "../components/aws-cloud-consulting-mentorship-landing-page/TestimonialsSection";
import CaseStudiesSection from "../components/aws-cloud-consulting-mentorship-landing-page/CaseStudiesSection";
import { fetchProfileData } from "../services/profileService";
import MetaHead from "../components/MetaHead";
import ExperienceEducation from "../components/ui/ExperienceEducation";
import { personalInfo as localPersonalInfo, pageSEO } from "../config/personalInfo";

export default function ReviewsPage({ profileData }) {
  // Use page-specific SEO for unique meta title
  const seo = pageSEO.reviews;
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />
      <TestimonialsSection profileData={profileData} isMainHeading={true} />
      <ExperienceEducation profileData={profileData} />
      <CaseStudiesSection profileData={profileData} />
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
    };
  }
}
