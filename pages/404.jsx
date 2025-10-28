import React from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/ui/MainLayout";
import MetaHead from "../components/MetaHead";
import Icon from "../components/AppIcon";
import { personalInfo as localPersonalInfo, pageSEO } from "../config/personalInfo";

const NotFoundPage = ({ profileData }) => {
  const router = useRouter();

  // Use page-specific SEO for unique meta title
  const seo = pageSEO.notFound;

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const quickLinks = [
    {
      title: "Home",
      description: "Return to our homepage",
      icon: "Home",
      path: "/",
    },
    {
      title: "Services",
      description: "Explore our AWS consulting services",
      icon: "Briefcase",
      path: "/services",
    },
    {
      title: "About",
      description: "Learn more about our expertise",
      icon: "User",
      path: "/about",
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      icon: "Mail",
      path: "/contact",
    },
    {
      title: "Blog",
      description: "Read our latest tech articles",
      icon: "BookOpen",
      path: "/blogs",
    },
    {
      title: "Book Consultation",
      description: "Schedule a free consultation",
      icon: "Calendar",
      path: "/booking",
    },
  ];

  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} titleSuffix="" />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* 404 Animation */}
            <div className="mb-8">
              <div className="relative inline-block">
                <h1 className="text-9xl md:text-[12rem] font-bold text-white/20 select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon name="AlertTriangle" size={64} color="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                The page you're looking for seems to have wandered off into the cloud. 
                Don't worry, even the best AWS architectures have the occasional missing route!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleGoHome}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Icon name="Home" size={20} />
                <span>Go to Homepage</span>
              </button>

              <button
                onClick={handleGoBack}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Icon name="ArrowLeft" size={20} />
                <span>Go Back</span>
              </button>
            </div>

            {/* Search Bar */}
            {/* <div className="max-w-md mx-auto mb-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for what you need..."
                  className="w-full px-6 py-4 rounded-full text-primary placeholder-text-secondary border-0 focus:ring-2 focus:ring-white/30 outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      // Simple search redirect - you can enhance this
                      router.push(`/?search=${encodeURIComponent(e.target.value)}`);
                    }
                  }}
                />
                <div className="absolute right-2 top-2 bg-accent text-white p-2 rounded-full">
                  <Icon name="Search" size={20} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Where would you like to go?
            </h3>
            <p className="text-lg text-text-secondary">
              Here are some popular destinations to get you back on track
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                onClick={() => router.push(link.path)}
                className="bg-white rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Icon name={link.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {link.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon name="ArrowRight" size={16} color="#FF9900" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <Icon name="HelpCircle" size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Still can't find what you're looking for?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help! Reach out and we'll get you sorted in no time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/contact")}
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={20} />
                <span>Contact Support</span>
              </button>
              
              <button
                onClick={() => router.push("/booking")}
                className="bg-accent text-white border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Calendar" size={20} />
                <span>Book a Call</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-8">
            While you're here, did you know?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Cloud" size={32} color="#FF9900" />
              </div>
              <h4 className="font-bold text-primary mb-2">AWS has 200+ services</h4>
              <p className="text-text-secondary text-sm">
                And we can help you navigate them all efficiently
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={32} color="#1B365D" />
              </div>
              <h4 className="font-bold text-primary mb-2">30-50% cost savings</h4>
              <p className="text-text-secondary text-sm">
                Average savings our clients achieve with proper optimization
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} color="#38A169" />
              </div>
              <h4 className="font-bold text-primary mb-2">100+ success stories</h4>
              <p className="text-text-secondary text-sm">
                Engineers and companies we've helped succeed with AWS
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export async function getStaticProps() {
  try {
    return {
      props: {
        profileData: localPersonalInfo,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        profileData: localPersonalInfo,
      },
    };
  }
}

export default NotFoundPage;
