import React from 'react';
import MainLayout from '../components/ui/MainLayout';
import ServicesSection from '../components/aws-cloud-consulting-mentorship-landing-page/ServicesSection';
import { fetchProfileData } from '../services/profileService';
import MetaHead from '../components/MetaHead';
import { personalInfo as localPersonalInfo } from '../config/personalInfo';

export default function ServicesPage({ profileData }) {
  const seo = profileData?.seo || localPersonalInfo?.seo;
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} titleSuffix=" | Services" />
      <ServicesSection profileData={profileData} />
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
