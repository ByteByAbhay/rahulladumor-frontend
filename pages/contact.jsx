import React from 'react';
import MainLayout from '../components/ui/MainLayout';
import ContactSection from '../components/aws-cloud-consulting-mentorship-landing-page/ContactSection';
import { fetchProfileData } from '../services/profileService';
import MetaHead from '../components/MetaHead';
import { personalInfo as localPersonalInfo, pageSEO } from '../config/personalInfo';

export default function ContactPage({ profileData }) {
  // Use page-specific SEO for unique meta title
  const seo = pageSEO.contact;
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />
      <ContactSection profileData={profileData} />
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
