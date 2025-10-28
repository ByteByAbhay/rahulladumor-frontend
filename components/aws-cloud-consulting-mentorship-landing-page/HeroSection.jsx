import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import RenderHTML from "../ui/RenderHTML";
import Image from "components/AppImage";
import { useRouter } from "next/navigation";
import { trackConsultationBooked, trackCTAClick } from "../../utils/ga4Events";

const HeroSection = ({ profileData }) => {
  const personalInfo = profileData || {};
  console.log("🚀 ~ HeroSection ~ personalInfo:", personalInfo);
  const [menteeCount, setMenteeCount] = useState(0);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const router = useRouter();

  // Use metrics directly from personalInfo with fallback
  const metrics = personalInfo.metrics || [];

  // Get certifications from personalInfo skills or create from achievements
  const certifications = personalInfo?.certifications || [];

  useEffect(() => {
    // Get mentee count from personalInfo metrics
    const targetMenteeCount =
      parseInt(
        personalInfo.metrics?.find(
          (m) =>
            m.label?.includes("Engineers Mentored") ||
            m.label?.includes("Mentored")
        )?.value
      ) || 200;

    const countInterval = setInterval(() => {
      setMenteeCount((prev) => {
        if (prev < targetMenteeCount) return prev + 1;
        return targetMenteeCount;
      });
    }, 30);

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  const handleBookingClick = () => {
    // Track consultation booking click in GA4
    trackConsultationBooked('hero_section');
    trackCTAClick('Get Free AWS Cost Audit', 'hero_section');
    
    // Open Calendly in new tab or scroll to booking section
    const calendlyUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/rahuldladumor/30min";

    if (
      calendlyUrl &&
      calendlyUrl !== "https://calendly.com/your-username/30min"
    ) {
      window.open(calendlyUrl, "_blank");
    } else {
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    router.push("/booking");
  };

  const handleTestimonialsClick = () => {
    trackCTAClick('View Success Stories', 'hero_section');
    router.push("/reviews");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden"
    >
      {/* Animated Cloud Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-20 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-16 bg-white/5 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-24 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-28 h-18 bg-white/5 rounded-full animate-float-medium"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="text-white space-y-8">
            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Icon name="Award" size={16} color="#FF9900" />
                <span className="text-sm font-medium">
                  AWS Community Builder
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Icon name="Users" size={16} color="#FF9900" />
                <span className="text-sm font-medium">
                  {menteeCount}+{" "}
                  {personalInfo.metrics?.find(
                    (m) =>
                      m.label?.includes("Engineers Mentored") ||
                      m.label?.includes("Mentored")
                  )?.label || "Engineers Mentored"}
                </span>
              </div>
            </div>

            {/* Main Headlines */}
            <div className="space-y-6">
              {/* <RenderHTML htmlString={personalInfo.mainHeading} /> */}
              <span
                dangerouslySetInnerHTML={{ __html: personalInfo.mainHeading }}
              />

              <p className="text-xl md:text-xl font-medium text-white/90 leading-relaxed">
                {personalInfo.tagline}
              </p>

              {/* Key Proof Points */}
              <div className="space-y-2 text-base md:text-lg text-white/80">
                <div className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    color="#38A169"
                    className="mt-1 flex-shrink-0"
                  />
                  <span>
                    Zero-downtime migrations processing 5M orders/mo &lt;200ms
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    color="#38A169"
                    className="mt-1 flex-shrink-0"
                  />
                  <span>
                    DevSecOps pipelines reducing MTTR from 14 days → 48hrs
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    color="#38A169"
                    className="mt-1 flex-shrink-0"
                  />
                  <span>IAM least-privilege across 200+ resources</span>
                </div>
              </div>
            </div>

            {/* All Metrics Displayed Simultaneously */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-200"
                >
                  <div className="text-3xl font-bold text-accent mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-white/80">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Single Primary CTA */}
            <div className="space-y-4 flex flex-col items-center">
              <button
                onClick={handleBookingClick}
                aria-label="Schedule free AWS cost audit consultation"
                className="w-full sm:w-auto bg-orange-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-orange-700 transition-all duration-200 shadow-2xl flex items-center justify-center space-x-3 group focus:ring-4 focus:ring-orange-300 focus:outline-none"
              >
                <Icon name="Calendar" size={24} />
                <span>Get Free AWS Cost Audit (30 min)</span>
                <Icon
                  name="ArrowRight"
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Urgency Message */}
              <div className="flex items-center justify-center space-x-2 text-sm text-white/70">
                <Icon name="Clock" size={16} color="#ED8936" />
                <span className="font-medium">
                  Only 3 consultation slots left this week
                </span>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="#38A169" />
                  <span>Free 30-min consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} color="#38A169" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} color="#38A169" />
                  <span>24-hour response time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Profile Image */}
            <div className="relative z-10 mb-8">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                <Image
                  src={personalInfo.image || "/assets/images/profile.avif"}
                  alt={`${
                    personalInfo.name || "Professional"
                  } - Professional Photo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.target.src =
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                  }}
                />
              </div>

              {/* Floating Certification Badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg animate-float-slow">
                <Icon name="Award" size={24} color="#FF9900" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-white rounded-lg p-3 shadow-lg animate-float-medium">
                <Icon name="Shield" size={24} color="#1B365D" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-3 shadow-lg animate-float-slow">
                <Icon name="Settings" size={24} color="#38A169" />
              </div>
            </div>

            {/* AWS Certifications Carousel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-white font-semibold mb-4 text-center text-xl">
                AWS Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      index >= 3 && !showAllCertifications
                        ? "max-h-0 opacity-0 transform scale-95 -translate-y-2 mb-0"
                        : "max-h-24 opacity-100 transform scale-100 translate-y-0 mb-3"
                    }`}
                    style={{
                      transitionDelay: showAllCertifications
                        ? `${Math.max(0, index - 2) * 100}ms`
                        : "0ms",
                    }}
                  >
                    <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                      <Icon name={cert.icon} size={20} color="#FF9900" />
                      <div>
                        <div className="text-white font-medium text-sm">
                          {cert.name}
                        </div>
                        <div className="text-white/70 text-xs">
                          {cert.level}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More/Less Button */}
              {certifications.length > 3 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() =>
                      setShowAllCertifications(!showAllCertifications)
                    }
                    className="text-accent hover:text-orange-400 font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-1 mx-auto hover:scale-105 active:scale-95"
                  >
                    <span className="transition-all duration-300">
                      {showAllCertifications ? "Show Less" : "Show More"}
                    </span>
                    <div className="transition-transform duration-300 ease-in-out">
                      <Icon
                        name={
                          showAllCertifications ? "ChevronUp" : "ChevronDown"
                        }
                        size={16}
                      />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
