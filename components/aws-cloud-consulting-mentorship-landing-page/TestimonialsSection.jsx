import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import Image from "components/AppImage";
import { extendedTestimonials } from "../../config/personalInfo";

const TestimonialsSection = ({ profileData, isMainHeading = false }) => {
  const personalInfo = profileData || {};
  const HeadingTag = isMainHeading ? 'h1' : 'h2';

  // Get testimonials section data from personalInfo with fallbacks
  const testimonialsData = personalInfo.testimonialsSection || {};
  const testimonials = testimonialsData.testimonials || [];
  const socialProofData = testimonialsData.socialProof || {};
  const defaultResults = testimonialsData.defaultResults || {};
  const defaultBeforeAfter = testimonialsData.defaultBeforeAfter || {};

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless infinite scroll
  const infiniteTestimonials = [
    ...extendedTestimonials,
    ...extendedTestimonials,
    ...extendedTestimonials, // Triple for smoother infinite scroll
  ];

  // Enhanced testimonials with additional display data
  const enhancedTestimonials = testimonials.map((testimonial, i) => ({
    ...testimonial,
    name:
      testimonial.name.split(" ")[0] +
        " " +
        (testimonial.name.split(" ")[1]
          ? testimonial.name.split(" ")[1].charAt(0) + "."
          : "") || "Client",
    id:
      testimonial.name?.replace(/\s+/g, "-").toLowerCase() ||
      Math.random().toString(36).substr(2, 9),
    role: testimonial.position || "Professional",
    image:
      testimonial.image || `https://randomuser.me/api/portraits/men/${i}.jpg`,
    rating: 5,
    videoThumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    results: defaultResults,
    beforeAfter: defaultBeforeAfter,
    // linkedin: testimonial.linkedin
  }));

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % enhancedTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + enhancedTestimonials.length) % enhancedTestimonials.length
    );
  };

  useEffect(() => {
    if (isAutoPlaying && enhancedTestimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial(
          (prev) => (prev + 1) % enhancedTestimonials.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, enhancedTestimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 px-4">
            {testimonialsData.title || "Real Results from Real Clients"}
          </HeadingTag>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4 mb-6 md:mb-8">
            {testimonialsData.subtitle ||
              "Don't just take my word for it. Here's what clients say about the measurable impact of our AWS optimization and mentorship programs."}
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          {enhancedTestimonials.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-border p-8 md:p-12">
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"> */}
              {/* Left: Testimonial Content */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[
                    ...Array(
                      enhancedTestimonials[currentTestimonial]?.rating || 5
                    ),
                  ].map((_, i) => (
                    <Icon key={i} name="Star" size={20} color="#FF9900" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed italic">
                  "
                  {enhancedTestimonials[currentTestimonial]?.testimonial ||
                    "Great experience working together!"}
                  "
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                    <Image
                      src={
                        enhancedTestimonials[currentTestimonial]?.image ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
                      }
                      alt={
                        enhancedTestimonials[currentTestimonial]?.name ||
                        "Client"
                      }
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">
                      {enhancedTestimonials[currentTestimonial]?.name ||
                        "Client"}
                    </h4>
                    <p className="text-text-secondary">
                      {enhancedTestimonials[currentTestimonial]?.role ||
                        "Professional"}{" "}
                      at{" "}
                      {enhancedTestimonials[currentTestimonial]?.company ||
                        "Company"}
                    </p>
                    {/* {enhancedTestimonials[currentTestimonial]?.linkedin && (
                      <a
                        href={enhancedTestimonials[currentTestimonial].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent text-sm hover:underline flex items-center space-x-1 mt-1"
                      >
                        <Icon name="Linkedin" size={14} color="#FF9900" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )} */}
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="bg-surface rounded-lg p-4">
                  <h5 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                    <Icon name="TrendingUp" size={18} color="#1B365D" />
                    <span>Results Achieved</span>
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(
                      enhancedTestimonials[currentTestimonial]?.results || {}
                    ).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold text-accent">
                          {value}
                        </div>
                        <div className="text-xs text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Video/Image */}
              {/* <div className="relative">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <Image
                      src={enhancedTestimonials[currentTestimonial]?.videoThumbnail || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"}
                      alt={enhancedTestimonials[currentTestimonial]?.name || "Client"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        className="w-16 h-16 bg-accent rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200 cta-shadow"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        aria-label={isAutoPlaying ? "Pause testimonial slideshow" : "Play testimonial slideshow"}
                      >
                        <Icon name={isAutoPlaying ? "Pause" : "Play"} size={24} color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>

        {/* Navigation */}
        {enhancedTestimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-4 my-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-surface hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <div className="flex space-x-2">
              {enhancedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1} from ${enhancedTestimonials[index]?.name || 'client'}`}
                  aria-current={index === currentTestimonial ? "true" : "false"}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? "bg-accent"
                      : "bg-border hover:bg-primary"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-surface hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        )}

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {enhancedTestimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl cursor-pointer ${
                index === currentTestimonial ? "border-accent" : "border-border"
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} color="#FF9900" />
                ))}
              </div>

              <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
                {testimonial.testimonial}
              </p>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Key Result:</span>
                  <span className="font-semibold text-accent">
                    {Object.values(testimonial.results)[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Testimonials Slider */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              LinkedIn Recommendations Received
            </h3>
            <p className="text-lg text-text-secondary">
              Professional endorsements from colleagues, team leads, and
              industry experts who've worked with me
            </p>
          </div>

          {/* Infinite Slider Container */}
          <div className="relative overflow-hidden py-4">
            <div
              className={`flex space-x-6 ${
                isPaused ? "" : "animate-infinite-scroll"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                width: `${infiniteTestimonials.length * 320}px`,
                animation: isPaused
                  ? "none"
                  : "infiniteScroll 60s linear infinite",
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="testimonial-card flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-border"
                >
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} color="#FF9900" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-text-primary text-sm leading-relaxed mb-6 italic">
                    "{testimonial.review}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                    <div className="text-accent font-bold text-sm">
                      {testimonial.achievement}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      Key Result
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 slider-gradient-left pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 slider-gradient-right pointer-events-none z-10"></div>
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="bg-primary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">
            {socialProofData.title || "Trusted by 100+ Professionals"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(socialProofData.stats || []).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {stat.value || "0"}
                </div>
                <p className="text-sm opacity-90">{stat.label || "Metric"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-text {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infiniteScroll 60s linear infinite;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        /* Smooth hover effects */
        .testimonial-card {
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Gradient overlays for smooth edges */
        .slider-gradient-left {
          background: linear-gradient(
            to right,
            var(--surface-color, #f8fafc),
            transparent
          );
        }

        .slider-gradient-right {
          background: linear-gradient(
            to left,
            var(--surface-color, #f8fafc),
            transparent
          );
        }

        /* Ensure all profile images are perfectly round */
        .testimonial-card img,
        .testimonial-grid img,
        .main-testimonial img {
          border-radius: 50% !important;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center;
        }

        /* Force circular containers */
        .profile-image-container {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
