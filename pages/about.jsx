import React from 'react';
import MainLayout from '../components/ui/MainLayout';
import AboutSection from '../components/aws-cloud-consulting-mentorship-landing-page/AboutSection';
import { fetchProfileData } from '../services/profileService';
import MetaHead from '../components/MetaHead';
import { personalInfo as localPersonalInfo, workExperience as exportedWorkExperience, education as exportedEducation } from '../config/personalInfo';

export default function AboutPage({ profileData }) {
  const seo = profileData?.seo || localPersonalInfo?.seo;
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} titleSuffix=" | About" />
      <AboutSection profileData={profileData} education={exportedEducation} />
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
