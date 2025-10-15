import React from "react";
import MainLayout from "../components/ui/MainLayout";
import HeroSection from "../components/aws-cloud-consulting-mentorship-landing-page/HeroSection";
import ProblemSection from "../components/aws-cloud-consulting-mentorship-landing-page/ProblemSection";
import SolutionSection from "../components/aws-cloud-consulting-mentorship-landing-page/SolutionSection";
import CredentialsSection from "../components/aws-cloud-consulting-mentorship-landing-page/CredentialsSection";
// import ServicesSection from "../components/aws-cloud-consulting-mentorship-landing-page/ServicesSection";
// import TestimonialsSection from "../components/aws-cloud-consulting-mentorship-landing-page/TestimonialsSection";
// import CaseStudiesSection from "../components/aws-cloud-consulting-mentorship-landing-page/CaseStudiesSection";
// import AboutSection from "../components/aws-cloud-consulting-mentorship-landing-page/AboutSection";
// import BookingSection from "../components/aws-cloud-consulting-mentorship-landing-page/BookingSection";
// import FAQSection from "../components/aws-cloud-consulting-mentorship-landing-page/FAQSection";
// import ContactSection from "../components/aws-cloud-consulting-mentorship-landing-page/ContactSection";
import TrustedBySection from "../components/aws-cloud-consulting-mentorship-landing-page/TrustedBySection";
import { fetchProfileData, fetchBlogs } from "../services/profileService";
import MetaHead from "../components/MetaHead";
import { personalInfo as localPersonalInfo, seo as localSeo } from "../config/personalInfo";

export default function HomePage({ profileData, blogs = [] }) {
  const seo = profileData?.seo || localSeo;
  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} titleSuffix="" />
      <HeroSection profileData={profileData} />
      <TrustedBySection />
      <ProblemSection profileData={profileData} />
      <SolutionSection profileData={profileData} />
      <CredentialsSection profileData={profileData} blogs={blogs} />
      {/* <ServicesSection profileData={profileData} />
      <TestimonialsSection profileData={profileData} />
      <CaseStudiesSection profileData={profileData} />
      <AboutSection profileData={profileData} />
      <BookingSection />
      <FAQSection />
      <ContactSection profileData={profileData} /> */}
    </MainLayout>
  );
}

export async function getStaticProps() {
  try {
    const profileData = await fetchProfileData();
    const blogs = await fetchBlogs();
    console.log("🚀 ~ getStaticProps ~ blogs:", blogs);
    return {
      props: {
        profileData,
        blogs,
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
        blogs: [],
      },
    };
  }
}
