import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import Image from "components/AppImage";
import { useRouter } from "next/navigation";
import api from "../../utils/api/api";

const CredentialsSection = ({ profileData, blogs }) => {
  const personalInfo = profileData || {};

  const router = useRouter();

  // Get credentials section data from personalInfo with fallbacks
  const credentialsData = personalInfo.credentialsSection || {};
  const achievements = credentialsData.achievements || [];
  const communityMetrics = credentialsData.communityMetrics || {};
  const ctaData = credentialsData.cta || {};

  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [articleViews, setArticleViews] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [isBlogsPaused, setIsBlogsPaused] = useState(false);

  // Use certifications from personalInfo with enhanced display data
  const certifications = (personalInfo.certifications || []).map((cert) => ({
    name: cert.name || "AWS Certification",
    level: cert.level || "Associate",
    icon: getIconForCertification(cert.name),
    color: getColorForLevel(cert.level),
    description: getDescriptionForCertification(cert.name),
    validUntil: cert.year || "2024",
    credentialId: cert.credentialId || "AWS-CERT-ID",
  }));

  // Helper functions to map certification data to display properties
  function getIconForCertification(name) {
    if (name?.includes("Developer")) return "Code";
    if (name?.includes("Solutions Architect")) return "Award";
    if (name?.includes("Community Builder")) return "Users";
    if (name?.includes("Security")) return "Shield";
    if (name?.includes("DevOps")) return "Settings";
    return "Award";
  }

  function getColorForLevel(level) {
    switch (level?.toLowerCase()) {
      case "professional":
        return "#1B365D";
      case "specialty":
        return "#38A169";
      case "community":
        return "#FF9900";
      case "associate":
      default:
        return "#FF9900";
    }
  }

  function getDescriptionForCertification(name) {
    if (name?.includes("Developer"))
      return "Application development and deployment expertise on AWS";
    if (name?.includes("Solutions Architect"))
      return "Advanced architectural design and implementation expertise";
    if (name?.includes("Community Builder"))
      return "Official recognition for community contributions and thought leadership";
    if (name?.includes("Security"))
      return "Advanced security implementation and compliance";
    if (name?.includes("DevOps"))
      return "CI/CD, automation, and infrastructure as code mastery";
    return "AWS cloud expertise and best practices";
  }

  // Keep certifications as they are specific to the component
  // achievements now come from personalInfo

  const speakingEvents = [
    {
      event: "AWS re:Invent 2023",
      topic: "Cost Optimization Strategies",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
    },
    {
      event: "DevOps India Summit",
      topic: "Infrastructure as Code",
      image:
        "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=300&h=200&fit=crop",
    },
    {
      event: "Cloud Native Meetup",
      topic: "Serverless Architecture",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
    },
  ];

  useEffect(() => {
    const certInterval = setInterval(() => {
      if (certifications.length > 0) {
        setCurrentCertIndex((prev) => (prev + 1) % certifications.length);
      }
    }, 4000);

    const followerTarget = communityMetrics.followers || 5000;
    const viewsTarget = communityMetrics.articleViewsTarget || 55000;
    const followerSpeed = communityMetrics.animationSpeed?.followers || 100;
    const viewsSpeed = communityMetrics.animationSpeed?.views || 50;

    const followerInterval = setInterval(() => {
      setFollowerCount((prev) => {
        if (prev < followerTarget) return prev + 50;
        return followerTarget;
      });
    }, followerSpeed);

    const viewsInterval = setInterval(() => {
      setArticleViews((prev) => {
        if (prev < viewsTarget) return prev + 1000;
        return viewsTarget;
      });
    }, viewsSpeed);

    return () => {
      clearInterval(certInterval);
      clearInterval(followerInterval);
      clearInterval(viewsInterval);
    };
  }, []);

  // Separate useEffect for blog auto-sliding
  useEffect(() => {
    if (typeof window !== "undefined" && blogs?.length > 0) {
      const blogInterval = setInterval(() => {
        setCurrentBlogIndex((prev) => {
          const nextIndex = prev + 1;
          // Reset to 0 when reaching the end for infinite effect
          return nextIndex >= blogs.length ? 0 : nextIndex;
        });
      }, 3000);

      return () => {
        clearInterval(blogInterval);
      };
    }
  }, [blogs]);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {credentialsData.title || "Proven AWS Expertise & Recognition"}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {personalInfo.experience?.years || "8+"}{" "}
            {credentialsData.subtitle ||
              "years of hands-on AWS experience backed by industry certifications, community recognition, and measurable client results."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Rotating Certifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              AWS Certifications
            </h3>

            {/* <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={32} color="white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">AWS Community Builder</h4>
              </div>
            </div> */}

            <div className="relative h-64 mb-6">
              {certifications.length > 0 ? (
                certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentCertIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name={cert.icon} size={40} color="white" />
                      </div>

                      <h4 className="text-xl font-bold text-primary mb-2">
                        {cert.name}
                      </h4>
                      <p className="text-accent font-semibold mb-3">
                        {cert.level}
                      </p>
                      <p className="text-text-secondary mb-4">
                        {cert.description}
                      </p>

                      <div className="bg-surface rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Year:</span>
                          <span className="font-semibold text-primary">
                            {cert.validUntil}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-text-secondary">
                            Credential ID:
                          </span>
                          <span className="font-mono text-xs text-primary">
                            {cert.credentialId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="Award" size={40} color="white" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">
                    AWS Certifications
                  </h4>
                  <p className="text-text-secondary">
                    Certifications information coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Certification Indicators */}
            {certifications.length > 1 && (
              <div className="flex justify-center space-x-2">
                {certifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCertIndex(index)}
                    aria-label={`View certification ${index + 1}: ${certifications[index]?.name || 'certification'}`}
                    aria-current={index === currentCertIndex ? "true" : "false"}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentCertIndex
                        ? "bg-accent"
                        : "bg-border hover:bg-primary"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Community Metrics */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Community Impact
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {followerCount.toLocaleString()}+
                  </div>
                  <p className="text-sm text-text-secondary">
                    LinkedIn Followers
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {articleViews.toLocaleString()}+
                  </div>
                  <p className="text-sm text-text-secondary">Article Views</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <p className="text-sm text-text-secondary">
                    Published Articles
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">15+</div>
                  <p className="text-sm text-text-secondary">Speaking Events</p>
                </div>
              </div>
            </div>

            {/* AWS Community Builder Badge */}
            <div className="bg-gradient-to-r from-accent to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Award" size={32} color="white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">AWS Community Builder</h4>
                  <p className="opacity-90">Official AWS Recognition Program</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                Selected by AWS for exceptional community contributions,
                technical expertise, and thought leadership in cloud computing.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-surface rounded-lg flex items-center justify-center">
                <Icon
                  name={achievement.icon || "Award"}
                  size={24}
                  color={achievement.color || "#FF9900"}
                />
              </div>
              <h4 className="font-bold text-primary mb-2">
                {achievement.title || "Achievement"}
              </h4>
              <p className="text-sm text-text-secondary">
                {achievement.description || "Achievement description"}
              </p>
            </div>
          ))}
        </div>

        {/* Speaking Engagements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            Recent Speaking Engagements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakingEvents.map((event, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={event.image}
                    alt={event.event}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">{event.event}</h4>
                    <p className="text-sm opacity-90">{event.topic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Blog Articles */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Latest Tech Insights & Articles
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Stay updated with the latest trends, tutorials, and insights from
              the tech community
            </p>
          </div>

          <div className="relative overflow-hidden">
            {blogs?.length > 0 ? (
              <div className="relative">
                {/* Infinite Blog Slider Container */}
                <div className="relative overflow-hidden py-4">
                  <div
                    className={`flex space-x-6 ${isBlogsPaused ? '' : 'animate-infinite-scroll-blogs'}`}
                    onMouseEnter={() => setIsBlogsPaused(true)}
                    onMouseLeave={() => setIsBlogsPaused(false)}
                    style={{
                      width: `${blogs.length * 3 * 320}px`,
                      animation: isBlogsPaused ? 'none' : 'infiniteScrollBlogs 80s linear infinite'
                    }}
                  >
                    {/* Triple blogs for smoother infinite scroll */}
                    {[...blogs, ...blogs, ...blogs].map((blog, index) => (
                      <a
                        key={`${blog.id}-${index}`}
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read article: ${blog.title}`}
                        className="blog-card flex-shrink-0 w-80 group cursor-pointer block"
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                          {/* Blog cover image */}
                          <div className="relative h-48 overflow-hidden">
                            {blog.cover_image ? (
                              <Image
                                src={blog.cover_image}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Icon name="FileText" size={48} color="white" />
                              </div>
                            )}
                            <div className="absolute top-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">
                                {blog.reading_time_minutes} min read
                              </div>
                            </div>
                          </div>

                          {/* Blog content */}
                          <div className="p-6">
                            {/* Author info */}
                            <div className="flex items-center space-x-3 mb-4">
                              <Image
                                src={blog.user.profile_image_90}
                                alt={blog.user.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="text-sm font-medium text-primary">
                                  {blog.user.name}
                                </p>
                                <p className="text-xs text-text-secondary">
                                  {blog.readable_publish_date}
                                </p>
                              </div>
                            </div>

                            {/* Blog title */}
                            <h4 className="font-bold text-lg text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                              {blog.title}
                            </h4>

                            {/* Blog description */}
                            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                              {blog.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tag_list
                                .slice(0, 3)
                                .map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="bg-surface text-primary text-xs px-2 py-1 rounded-full font-medium"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                            </div>

                            {/* Engagement metrics */}
                            <div className="flex items-center justify-between text-xs text-text-secondary">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Heart" size={14} />
                                  <span>{blog.positive_reactions_count}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon name="MessageCircle" size={14} />
                                  <span>{blog.comments_count || 0}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-accent">
                                <span>Read more</span>
                                <Icon name="ExternalLink" size={12} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 blog-gradient-left pointer-events-none z-10"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 blog-gradient-right pointer-events-none z-10"></div>
                </div>

                {/* Show More Blogs Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => router.push("/blogs")}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Icon name="BookOpen" size={20} />
                    <span>View All Articles</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // No blogs available
              <div className="text-center py-12">
                <Icon
                  name="FileText"
                  size={48}
                  color="#9CA3AF"
                  className="mx-auto mb-4"
                />
                <p className="text-text-secondary">
                  No articles available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {ctaData.title || "Work with a Proven AWS Expert"}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {ctaData.subtitle ||
                `Get the same expertise that's helped ${
                  personalInfo.experience?.companies || "10+"
                }+ engineers and startups succeed`}
            </p>
            <button
              onClick={() => {
                router.push("/booking");
              }}
              className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 cta-shadow inline-flex items-center space-x-2"
            >
              <Icon name={ctaData.buttonIcon || "Calendar"} size={20} />
              <span>{ctaData.buttonText || "Schedule Your Consultation"}</span>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes infiniteScrollBlogs {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .animate-infinite-scroll-blogs {
          animation: infiniteScrollBlogs 80s linear infinite;
        }
        
        .animate-infinite-scroll-blogs:hover {
          animation-play-state: paused;
        }
        
        /* Smooth hover effects for blog cards */
        .blog-card {
          transition: all 0.3s ease;
        }
        
        .blog-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
        
        /* Gradient overlays for smooth edges */
        .blog-gradient-left {
          background: linear-gradient(
            to right,
            var(--surface-color, #f8fafc),
            transparent
          );
        }
        
        .blog-gradient-right {
          background: linear-gradient(
            to left,
            var(--surface-color, #f8fafc),
            transparent
          );
        }
      `}</style>
    </section>
  );
};

export default CredentialsSection;
