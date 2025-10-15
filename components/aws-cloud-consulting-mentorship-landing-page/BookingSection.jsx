import React, { useState } from "react";
import Icon from "components/AppIcon";

const BookingSection = ({
  calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/rahuldladumor/30min",
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);

  // Convert Calendly URL to embed format url
  const getEmbedUrl = (url) => {
    if (!url) return "https://calendly.com/rahuldladumor/30min";

    // If it's already an embed URL, return as is
    if (url.includes("?embed=")) return url;

    // Convert regular Calendly URL to embed format
    const embedUrl = url.includes("?")
      ? `${url}&embed=true`
      : `${url}?embed=true`;

    return embedUrl;
  };

  const handleIframeLoad = () => {
    console.log("Calendly iframe loaded");
    // Add a small delay to ensure content is rendered
    setTimeout(() => {
      setShowLoadingSkeleton(false);
      setIsIframeLoaded(true);
    }, 1000);
  };

  const embedUrl = getEmbedUrl(calendlyUrl);

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-border rounded-lg w-3/4 mx-auto"></div>
        <div className="h-4 bg-border rounded w-1/2 mx-auto"></div>
      </div>

      {/* Calendar grid skeleton */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-10 bg-border rounded"></div>
        ))}
      </div>

      {/* Time slots skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-border rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  // const ErrorFallback = () => (
  //   <div className="text-center py-12">
  //     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //       <Icon name="AlertCircle" size={32} color="#E53E3E" />
  //     </div>
  //     <h3 className="text-2xl font-bold text-primary mb-4">
  //       Unable to Load Calendar
  //     </h3>
  //     <p className="text-text-secondary mb-6 max-w-md mx-auto">
  //       We're having trouble loading the booking calendar. Please try one of the alternatives below.
  //     </p>

  //     <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //       <a
  //         href={embedUrl}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 inline-flex items-center space-x-2 cta-shadow"
  //       >
  //         <Icon name="ExternalLink" size={20} />
  //         <span>Open in New Tab</span>
  //       </a>
  //       <a
  //         href="mailto:contact@acloudwithrahul.in?subject=Discovery Call Request"
  //         className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 inline-flex items-center space-x-2"
  //       >
  //         <Icon name="Mail" size={20} />
  //         <span>Email Instead</span>
  //       </a>
  //     </div>
  //   </div>
  // );

  return (
    <section id="booking" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Book Your Free Discovery Call
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Let's discuss your AWS challenges and explore how we can work
            together to achieve your goals. No sales pitch, just valuable
            insights.
          </p>

          {/* Urgency Message */}
          {/* <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={20} color="#ED8936" />
              <span className="text-orange-800 font-semibold">
                Limited availability - Book your slot today
              </span>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendly Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
              {/* Calendly Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <div className="flex items-center space-x-3">
                  <Icon name="Calendar" size={24} color="white" />
                  <div>
                    <h3 className="text-xl font-bold">
                      Select Your Preferred Time
                    </h3>
                    <p className="text-blue-100">
                      Choose a time that works best for you
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendly Widget Container */}
              <div className="relative min-h-[600px] p-6">
                {/* Loading Skeleton Overlay */}
                {showLoadingSkeleton && (
                  <div className="absolute inset-6 z-20 bg-white rounded-lg">
                    <div className="flex items-center justify-center mb-6 pt-4">
                      <Icon
                        name="Loader"
                        size={24}
                        color="#FF9900"
                        className="animate-spin mr-2"
                      />
                      <span className="text-text-secondary font-medium">
                        Loading calendar...
                      </span>
                    </div>
                    <LoadingSkeleton />
                  </div>
                )}

                {/* Direct Calendly Iframe */}
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  title="Calendly Booking"
                  onLoad={handleIframeLoad}
                  className={`transition-opacity duration-700 rounded-lg ${
                    isIframeLoaded && !showLoadingSkeleton
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{ minHeight: "600px" }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Call Details */}
              <div className="bg-white rounded-xl shadow-lg border border-border p-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="Clock"
                      size={20}
                      color="#38A169"
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">30 Minutes</h4>
                      <p className="text-sm text-text-secondary">
                        Focused discussion on your challenges
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="Video"
                      size={20}
                      color="#38A169"
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">Video Call</h4>
                      <p className="text-sm text-text-secondary">
                        Zoom link provided after booking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="FileText"
                      size={20}
                      color="#38A169"
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">
                        Action Plan
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Immediate next steps and recommendations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="DollarSign"
                      size={20}
                      color="#38A169"
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">
                        Completely Free
                      </h4>
                      <p className="text-sm text-text-secondary">
                        No hidden costs or obligations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl shadow-lg border border-border p-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  You'll Get
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircle"
                      size={16}
                      color="#38A169"
                      className="mt-1"
                    />
                    <span className="text-sm text-text-secondary">
                      Personalized AWS cost optimization strategy
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircle"
                      size={16}
                      color="#38A169"
                      className="mt-1"
                    />
                    <span className="text-sm text-text-secondary">
                      Architecture review and recommendations
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircle"
                      size={16}
                      color="#38A169"
                      className="mt-1"
                    />
                    <span className="text-sm text-text-secondary">
                      Career mentorship guidance
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircle"
                      size={16}
                      color="#38A169"
                      className="mt-1"
                    />
                    <span className="text-sm text-text-secondary">
                      Next steps action plan
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Shield" size={24} color="#38A169" />
                  <h3 className="text-lg font-bold text-green-800">
                    My Guarantee
                  </h3>
                </div>
                <p className="text-green-700 text-sm">
                  You'll walk away with at least 3 actionable insights to
                  improve your AWS setup, or I'll extend the call until you do.
                </p>
              </div>

              {/* Contact Alternative */}
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Prefer to Email?
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  If you have questions or prefer to reach out directly:
                </p>
                <a
                  href="mailto:contact@acloudwithrahul.in?subject=Discovery Call Inquiry"
                  className="inline-flex items-center space-x-2 text-accent hover:text-orange-600 transition-colors duration-200"
                >
                  <Icon name="Mail" size={16} />
                  <span className="text-sm font-medium">
                    contact@acloudwithrahul.in
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
