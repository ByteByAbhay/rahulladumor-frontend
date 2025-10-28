import React from 'react';
import MainLayout from '../components/ui/MainLayout';
import BookingSection from '../components/aws-cloud-consulting-mentorship-landing-page/BookingSection';
import FAQSection from '../components/aws-cloud-consulting-mentorship-landing-page/FAQSection';
import { fetchProfileData } from '../services/profileService';
import MetaHead from '../components/MetaHead';
import { personalInfo as localPersonalInfo, seo as localSeo, pageSEO } from '../config/personalInfo';

export default function BookingPage({ profileData }) {
  // Merge page-specific SEO with global verification codes
  const seo = {
    ...pageSEO.booking,
    googleVerification: localSeo.googleVerification,
    bingVerification: localSeo.bingVerification,
    pinterestVerification: localSeo.pinterestVerification,
  };
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />
      <BookingSection profileData={profileData} />
      <FAQSection profileData={profileData} />
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
    console.error('Error in getStaticProps:', error);
    
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
          contactSection: {}
        },
      },
    };
  }
}
