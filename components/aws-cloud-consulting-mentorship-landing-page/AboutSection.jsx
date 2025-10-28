import React, { useState } from "react";
import Icon from "components/AppIcon";
import Image from "components/AppImage";
import { useRouter } from "next/navigation";

const AboutSection = ({ profileData }) => {
  const router = useRouter();
  const education = profileData.education || [];
  const personalInfo = profileData || {};
  const aboutData = personalInfo.aboutSection || {};
  const tabs = aboutData.tabs || [];
  const expertiseAreas = aboutData.expertiseAreas || [];
  const approachSteps = aboutData.approachSteps || [];
  const coreValues = aboutData.coreValues || [];
  const ctaData = aboutData.cta || {};

  const [activeTab, setActiveTab] = useState("journey");
  const [expandedMilestones, setExpandedMilestones] = useState({});

  const toggleMilestone = (index) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const workExperience = personalInfo.workExperience || [];
  const journeyMilestones = [...workExperience]
    .sort((a, b) => {
      // Extract start year from duration string (e.g., "Apr 2016 - Sep 2017" -> 2016)
      const getStartYear = (duration) => {
        const match = duration?.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      };
      return getStartYear(b.duration) - getStartYear(a.duration);
    })
    .map((exp, index) => {
      const getIcon = (company, position) => {
        if (company?.toLowerCase().includes("creative")) return "Rocket";
        if (
          position?.toLowerCase().includes("lead") ||
          position?.toLowerCase().includes("senior")
        )
          return "Building";
        if (
          company?.toLowerCase().includes("ntt") ||
          position?.toLowerCase().includes("consultant")
        )
          return "Users";
        if (
          position?.toLowerCase().includes("sde") ||
          position?.toLowerCase().includes("developer")
        )
          return "Code";
        return "Briefcase";
      };

      const getCompanyColor = (company) => {
        const colors = [
          "#1B365D",
          "#FF6B35",
          "#7C3AED",
          "#059669",
          "#DC2626",
          "#0891B2",
        ];
        return colors[0];
      };

      return {
        duration: exp.duration || "Duration not specified",
        position: exp.position || "Position",
        company: exp.company || "Company",
        location: exp.location || "",
        description:
          exp.description || "Professional experience in software development.",
        technologies: exp.technologies || [],
        achievements: exp.achievements || [],
        icon: getIcon(exp.company, exp.position),
        color: getCompanyColor(exp.company),
      };
    });

  const aboutInfo = {
    name: personalInfo.name || "Professional",
    title: personalInfo.title || "AWS Cloud Expert",
    experience: personalInfo.experience?.years || "8+ Years",
    location: personalInfo.location || "Remote",
    languages: personalInfo.languages || ["English"],
    hobbies: personalInfo.skills?.primary || [
      "Technology",
      "Problem Solving",
    ],
    biography: personalInfo.bio?.includes("[")
      ? "Please update your professional biography in src/config/personalInfo.js"
      : personalInfo.bio || "Professional biography coming soon.",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "journey":
        return (
          <div className="space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 md:mb-4 px-4">
                My AWS Journey
              </h3>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
                From curious beginner to AWS expert, here's how I built the
                expertise that now helps others succeed in the cloud.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-6 md:space-y-8">
                {journeyMilestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative flex items-start space-x-3 sm:space-x-4 md:space-x-6"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative z-10"
                      style={{ backgroundColor: milestone.color }}
                    >
                      <Icon name={milestone.icon} size={20} className="sm:w-6 sm:h-6" color="white" />
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer">
                      {/* Header Section - Always Visible */}
                      <div
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4"
                        onClick={() => toggleMilestone(index)}
                      >
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <span
                              className="text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0"
                              style={{ backgroundColor: milestone.color }}
                            >
                              {milestone.duration}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-text-secondary hidden md:block">
                                {expandedMilestones[index]
                                  ? "Click to collapse"
                                  : "Click to expand"}
                              </span>
                              <div
                                className={`transform transition-transform duration-300 ${
                                  expandedMilestones[index]
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              >
                                <Icon
                                  name="ChevronDown"
                                  size={16}
                                  color="#6B7280"
                                />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-base sm:text-lg md:text-xl font-bold text-primary leading-tight mb-1">
                            {milestone.position}
                          </h4>
                          <div className="flex items-center space-x-2 text-accent font-semibold text-sm sm:text-base">
                            <Icon name="Building" size={14} className="sm:w-4 sm:h-4" color="#FF6B35" />
                            <span>{milestone.company}</span>
                          </div>
                          {milestone.location && (
                            <div className="flex items-center space-x-2 text-text-secondary text-xs sm:text-sm mt-1">
                              <Icon name="MapPin" size={12} className="sm:w-3.5 sm:h-3.5" color="#6B7280" />
                              <span>{milestone.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          expandedMilestones[index]
                            ? "max-h-lvh opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-2 border-t border-border">
                          {/* Description */}
                          <p className="text-text-secondary leading-relaxed mb-4">
                            {milestone.description}
                          </p>

                          {/* Technologies */}
                          {milestone.technologies &&
                            milestone.technologies.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-semibold text-primary mb-2 flex items-center space-x-1">
                                  <Icon name="Code" size={14} color="#1B365D" />
                                  <span>Technologies</span>
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.technologies.map(
                                    (tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full border border-border"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Key Achievements */}
                          {milestone.achievements &&
                            milestone.achievements.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold text-primary mb-2 flex items-center space-x-1">
                                  <Icon
                                    name="Award"
                                    size={14}
                                    color="#1B365D"
                                  />
                                  <span>Key Achievements</span>
                                </h5>
                                <ul className="space-y-2">
                                  {milestone.achievements.map(
                                    (achievement, achIndex) => (
                                      <li
                                        key={achIndex}
                                        className="text-text-secondary text-sm flex items-start space-x-2"
                                      >
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                          style={{
                                            backgroundColor: milestone.color,
                                          }}
                                        ></span>
                                        <span>{achievement}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "expertise":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Technical Expertise
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Deep specialization across key AWS domains with proven track
                record of delivering results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(expertiseAreas || []).map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-primary">
                      {area.category || "Expertise Area"}
                    </h4>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: area.color || "#1B365D" }}
                    >
                      {area.level || 90}%
                    </span>
                  </div>

                  <div className="w-full bg-surface rounded-full h-2 mb-4">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${area.level || 90}%`,
                        backgroundColor: area.color || "#1B365D",
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(area.skills || []).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "approach":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                My Methodology
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A proven 4-step approach that ensures sustainable results and
                knowledge transfer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(approachSteps || []).map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step || index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-primary mb-2 flex items-center space-x-2">
                        <Icon
                          name={step.icon || "Info"}
                          size={20}
                          color="#1B365D"
                        />
                        <span>{step.title || "Step"}</span>
                      </h4>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description || "Step description"}
                      </p>
                    </div>
                  </div>

                  {index < (approachSteps || []).length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "values":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Core Values
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The principles that guide every client interaction and project
                delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(coreValues || []).map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${value.color || "#1B365D"}15`,
                      }}
                    >
                      <Icon
                        name={value.icon || "Heart"}
                        size={24}
                        color={value.color || "#1B365D"}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-primary">
                      {value.title || "Core Value"}
                    </h4>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description || "Value description"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 px-4">
            {aboutData.title || "About Me"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            {aboutData.subtitle ||
              "Learn more about my journey, expertise, and approach to cloud solutions."}
          </p>
        </div>

        {/* Hero Section with Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-accent">
                  <Image
                    src={aboutInfo.image || "/assets/images/profile.avif"}
                    alt={aboutInfo.name || "Profile"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.target.src =
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {aboutInfo.name}
                </h3>
                <p className="text-accent font-semibold text-lg mb-4">
                  {aboutInfo.title}
                </p>

                <div className="space-y-2 text-sm text-text-secondary mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="MapPin" size={18} color="#4A5568" />
                    <span>{aboutInfo.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Clock" size={18} color="#4A5568" />
                    <span>{aboutInfo.experience} Experience</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {aboutInfo.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-surface text-text-secondary px-2 py-1 rounded text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {aboutInfo.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-surface text-text-secondary px-2 py-1 rounded text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => {
                    router.push("/booking");
                  }}
                  className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 cta-shadow"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            {/* Biography */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-border p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 md:mb-6">About Me</h3>
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-text-secondary mb-4 md:mb-6">
                <div
                  dangerouslySetInnerHTML={{ __html: aboutInfo.biography }}
                />
              </div>
            </div>

            {/* Education */}
            {Array.isArray(education) && education.length > 0 && (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-border p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 md:mb-6">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((ed, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between flex-wrap gap-2"
                    >
                      <div>
                        <div className="font-semibold text-primary">
                          {ed.degree}
                        </div>
                        <div className="text-text-secondary">
                          {ed.institution}
                        </div>
                      </div>
                      <div className="text-sm text-text-secondary text-right">
                        <div>{ed.year}</div>
                        {ed.location && <div>{ed.location}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="border-b border-border">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {(tabs || []).map((tab) => (
                    <button
                      key={tab.id || tab.label}
                      onClick={() => setActiveTab(tab.id || tab.label)}
                      className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                        activeTab === (tab.id || tab.label)
                          ? "text-primary border-b-2 border-accent bg-surface"
                          : "text-text-secondary hover:text-primary hover:bg-surface"
                      }`}
                    >
                      <Icon name={tab.icon || "Info"} size={16} className="sm:w-5 sm:h-5" />
                      <span>{tab.label || "Tab"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">{renderTabContent()}</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <div className="bg-primary rounded-xl md:rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
              {ctaData.title || "Ready to Transform Your AWS Journey?"}
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
              {ctaData.subtitle ||
                "Let's discuss how my experience and methodology can help you achieve your cloud goals."}
            </p>
            <button
              onClick={() => {
                router.push("/booking");
              }}
              className="bg-accent hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-200 cta-shadow flex items-center space-x-2 mx-auto"
            >
              <Icon
                name={ctaData.buttonIcon || "Calendar"}
                size={20}
                color="white"
              />
              <span>
                {ctaData.buttonText || "Schedule Your Free Consultation"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
