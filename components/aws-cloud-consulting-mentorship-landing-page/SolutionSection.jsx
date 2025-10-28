import React, { useState, useEffect, useRef } from "react";
import Icon from "components/AppIcon";
import { useRouter } from "next/navigation";

const SolutionSection = ({ profileData }) => {
  const personalInfo = profileData || {};
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Get solution section data from personalInfo with fallbacks
  const solutionData = personalInfo.solutionSection || {};
  const solutions = solutionData.solutions || [];
  const processData = solutionData.process || {};

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "bg-blue-100",
        iconColor: "#1B365D",
        text: "text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-100",
        iconColor: "#38A169",
        text: "text-green-800",
        button: "bg-green-600 hover:bg-green-700",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "bg-purple-100",
        iconColor: "#7C3AED",
        text: "text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700",
      },
    };
    return colors[color];
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setExpandedCard(null); // Auto-collapse when navigating
    setCurrentSlide((prev) => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setExpandedCard(null); // Auto-collapse when navigating
    setCurrentSlide((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  const goToSlide = (index) => {
    setExpandedCard(null); // Auto-collapse when navigating
    setCurrentSlide(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-play carousel (stops when card is expanded)
  useEffect(() => {
    // Don't auto-play if a card is expanded
    if (expandedCard !== null) {
      return;
    }

    const autoPlayInterval = setInterval(() => {
      if (window.innerWidth < 1024) {
        // Only auto-play on mobile
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(autoPlayInterval);
  }, [currentSlide, expandedCard]);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
            {solutionData.title || "Three Pillars of AWS Success"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {solutionData.subtitle ||
              "Proven methodologies that have helped startups and engineers achieve measurable results."}
          </p>
        </div>

        {/* Solutions Grid/Carousel */}
        <div className="mb-16">
          {/* Mobile Carousel */}
          <div className="lg:hidden relative px-4">
            <div
              ref={carouselRef}
              className="overflow-hidden -mx-4 pb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {solutions.map((solution, index) => {
                  const colorClasses = getColorClasses(solution.color);
                  const isExpanded = expandedCard === index;

                  return (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white rounded-3xl shadow-md border border-gray-100 transition-all duration-300">
                        <div className="p-6 sm:p-8">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                              <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 ${colorClasses.icon} rounded-2xl flex items-center justify-center flex-shrink-0`}
                              >
                                <Icon
                                  name={solution.icon}
                                  size={32}
                                  color={colorClasses.iconColor}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1 leading-tight">
                                  {solution.title || "Service"}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                                  {solution.subtitle || "Professional Service"}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleCard(index)}
                              aria-label={`${
                                isExpanded ? "Collapse" : "Expand"
                              } ${solution.title} details`}
                              aria-expanded={isExpanded}
                              className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
                            >
                              <Icon
                                name={isExpanded ? "ChevronUp" : "ChevronDown"}
                                size={24}
                                color="#4A5568"
                              />
                            </button>
                          </div>

                          {/* Description */}
                          <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                            {solution.description ||
                              "Professional service description."}
                          </p>

                          {/* Outcome Highlight */}
                          <div
                            className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-xl p-4 sm:p-5 mb-6`}
                          >
                            <div className="flex items-start space-x-3">
                              <Icon
                                name="Target"
                                size={20}
                                color={colorClasses.iconColor}
                                className="flex-shrink-0 mt-0.5"
                              />
                              <span
                                className={`font-bold text-base sm:text-lg ${colorClasses.text} leading-snug`}
                              >
                                {solution.outcome || "Measurable results"}
                              </span>
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="border-t border-gray-200 pt-6 mt-6">
                              <div className="grid grid-cols-1 gap-6">
                                <div>
                                  <h4 className="font-bold text-lg text-primary mb-4 flex items-center space-x-2">
                                    <Icon
                                      name="CheckSquare"
                                      size={22}
                                      color="#1B365D"
                                    />
                                    <span>Deliverables</span>
                                  </h4>
                                  <ul className="space-y-3">
                                    {(solution.deliverables || []).map(
                                      (deliverable, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start space-x-3"
                                        >
                                          <Icon
                                            name="Check"
                                            size={18}
                                            color="#38A169"
                                            className="mt-0.5 flex-shrink-0"
                                          />
                                          <span className="text-gray-700 text-base leading-relaxed">
                                            {deliverable}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-bold text-lg text-primary mb-4 flex items-center space-x-2">
                                    <Icon
                                      name="Clock"
                                      size={22}
                                      color="#1B365D"
                                    />
                                    <span>Timeline & Process</span>
                                  </h4>
                                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Icon
                                        name="Calendar"
                                        size={18}
                                        color="#FF9900"
                                      />
                                      <span className="font-bold text-primary">
                                        Duration
                                      </span>
                                    </div>
                                    <p className="text-gray-700 text-base">
                                      {solution.timeline || "To be determined"}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => {
                                      router.push("/booking");
                                    }}
                                    aria-label={`Book consultation for ${solution.title}`}
                                    className="w-full bg-accent text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                  >
                                    <Icon
                                      name="Calendar"
                                      size={20}
                                      color="white"
                                      className="flex-shrink-0"
                                    />
                                    <span>
                                      Get Started with{" "}
                                      {solution.title || "This Service"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Collapsed CTA */}
                          {!isExpanded && (
                            <div className="text-center">
                              <button
                                onClick={() => toggleCard(index)}
                                aria-label={`Learn more about ${solution.title}`}
                                className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                View Details & Deliverables
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous solution"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 z-10 border border-gray-200"
            >
              <Icon name="ChevronLeft" size={24} color="#1B365D" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next solution"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 z-10 border border-gray-200"
            >
              <Icon name="ChevronRight" size={24} color="#1B365D" />
            </button>

            {/* Carousel Dots */}
            <div className="flex justify-center items-center space-x-3 mt-8">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to solution ${index + 1}`}
                  aria-current={currentSlide === index ? "true" : "false"}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-10 h-3.5 bg-accent shadow-md"
                      : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const colorClasses = getColorClasses(solution.color);
              const isExpanded = expandedCard === index;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                    isExpanded ? "lg:col-span-3" : ""
                  }`}
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 ${colorClasses.icon} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon
                            name={solution.icon}
                            size={28}
                            color={colorClasses.iconColor}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary mb-2">
                            {solution.title || "Service"}
                          </h3>
                          <p className="text-text-secondary font-medium">
                            {solution.subtitle || "Professional Service"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCard(index)}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
                          solution.title
                        } details`}
                        aria-expanded={isExpanded}
                        className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
                      >
                        <Icon
                          name={isExpanded ? "ChevronUp" : "ChevronDown"}
                          size={20}
                          color="#4A5568"
                        />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {solution.description ||
                        "Professional service description."}
                    </p>

                    {/* Outcome Highlight */}
                    <div
                      className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-4 mb-6`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="Target"
                          size={16}
                          color={colorClasses.iconColor}
                        />
                        <span className={`font-semibold ${colorClasses.text}`}>
                          {solution.outcome || "Measurable results"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-border pt-6 mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-bold text-primary mb-4 flex items-center space-x-2">
                              <Icon
                                name="CheckSquare"
                                size={20}
                                color="#1B365D"
                              />
                              <span>Deliverables</span>
                            </h4>
                            <ul className="space-y-3">
                              {(solution.deliverables || []).map(
                                (deliverable, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start space-x-3"
                                  >
                                    <Icon
                                      name="Check"
                                      size={16}
                                      color="#38A169"
                                      className="mt-1 flex-shrink-0"
                                    />
                                    <span className="text-text-secondary">
                                      {deliverable}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-primary mb-4 flex items-center space-x-2">
                              <Icon name="Clock" size={20} color="#1B365D" />
                              <span>Timeline & Process</span>
                            </h4>
                            <div className="bg-surface rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Icon
                                  name="Calendar"
                                  size={16}
                                  color="#FF9900"
                                />
                                <span className="font-semibold text-primary">
                                  Duration
                                </span>
                              </div>
                              <p className="text-text-secondary">
                                {solution.timeline || "To be determined"}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                router.push("/booking");
                              }}
                              aria-label={`Book consultation for ${solution.title}`}
                              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 inline-flex items-center space-x-2 mt-4"
                            >
                              <Icon
                                name="Calendar"
                                size={20}
                                color="white"
                                className="flex-shrink-0"
                              />
                              <span>
                                Get Started with{" "}
                                {solution.title || "This Service"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Collapsed CTA */}
                    {!isExpanded && (
                      <div className="text-center">
                        <button
                          onClick={() => toggleCard(index)}
                          aria-label={`Learn more about ${solution.title}`}
                          className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200"
                        >
                          View Details & Deliverables
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Overview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 sm:p-8 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 sm:mb-10">
            {processData.title || "How We Work Together"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {(processData.steps || []).map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl mx-auto mb-4 shadow-md">
                  {item.step || index + 1}
                </div>
                <h4 className="font-bold text-base sm:text-lg text-primary mb-2">
                  {item.title || "Step"}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description || "Process step description"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
