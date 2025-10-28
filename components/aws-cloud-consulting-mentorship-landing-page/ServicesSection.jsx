import React, { useState, useEffect, useRef } from "react";
import Icon from "components/AppIcon";
import { useRouter } from "next/navigation";

const ServicesSection = ({ profileData }) => {
  const router = useRouter();
  const personalInfo = profileData || {};

  // Get services section data from personalInfo with fallbacks
  const servicesData = personalInfo.servicesSection || {};
  const services = servicesData.services || [];
  const comparisonData = servicesData.comparison || {};

  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  const totalSlides = services.length;

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Handle touch gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-600",
        button: "bg-green-600 hover:bg-green-700",
      },
    };
    return colors[color];
  };

  const formatPrice = (price, currency) => {
    return (
      (price[currency]?.toLocaleString() || price[currency]) +
      (currency === "INR" ? " ₹" : " $")
    );
  };

  const handleBookingClick = (serviceName) => {
    router.push("/booking");
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 px-4">
            {servicesData.title || "Choose Your AWS Success Path"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            {servicesData.subtitle ||
              "Flexible engagement models designed to meet your specific needs and budget, with guaranteed results and transparent pricing."}
          </p>

          {/* Currency Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
            <span className="text-sm md:text-base text-text-secondary font-medium">
              Currency:
            </span>
            <div className="flex bg-surface rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setSelectedCurrency("INR")}
                aria-label="Switch to Indian Rupees pricing"
                aria-pressed={selectedCurrency === "INR"}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-all duration-200 ${
                  selectedCurrency === "INR"
                    ? "bg-primary text-white shadow-md"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setSelectedCurrency("USD")}
                aria-label="Switch to US Dollars pricing"
                aria-pressed={selectedCurrency === "USD"}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-all duration-200 ${
                  selectedCurrency === "USD"
                    ? "bg-primary text-white shadow-md"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards - Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16 pt-6">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color) || {};

            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  service.popular ? "border-accent scale-105" : "border-border"
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-accent text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {service.name || "Service"}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {service.subtitle || "Service description"}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(service.price, selectedCurrency)}
                        </span>
                        {service.originalPrice && (
                          <span className="text-lg text-text-secondary line-through">
                            {formatPrice(
                              service.originalPrice,
                              selectedCurrency
                            )}
                          </span>
                        )}
                        <span className="text-sm text-text-secondary">
                          /{service.duration || "service"}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        Perfect for {service.idealFor || "your needs"}
                      </p>
                      {service.guarantee && (
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          {service.guarantee}
                        </p>
                      )}
                    </div>

                    {/* Ideal For */}
                    <div
                      className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-3 mb-6`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Icon
                          name="Target"
                          size={16}
                          color={colorClasses.text.replace("text-", "#")}
                        />
                        <span className={`font-semibold ${colorClasses.text}`}>
                          {service.idealFor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-primary mb-4 flex items-center space-x-2">
                      <Icon name="CheckCircle" size={18} color="#1B365D" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {(service.features || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Icon
                            name="Check"
                            size={16}
                            color="#38A169"
                            className="mt-1 flex-shrink-0"
                          />
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-primary mb-4 flex items-center space-x-2">
                      <Icon name="Package" size={18} color="#1B365D" />
                      <span>Deliverables</span>
                    </h4>
                    <ul className="space-y-2">
                      {(service.deliverables || []).map((deliverable, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Icon
                            name="FileText"
                            size={14}
                            color="#FF9900"
                            className="mt-1 flex-shrink-0"
                          />
                          <span className="text-text-secondary">
                            {deliverable}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleBookingClick(service.name)}
                    className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${colorClasses.button}`}
                  >
                    {service.buttonText || "Get Started"}
                  </button>

                  {/* Guarantee */}
                  {service.guarantee && (
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                        <Icon name="Shield" size={16} color="#38A169" />
                        <span className="font-medium">{service.guarantee}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-12 overflow-hidden">
          <div
            className="relative pt-5 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
          >
            {/* Carousel Container */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => {
                const colorClasses = getColorClasses(service.color) || {};

                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div
                      className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 ${
                        service.popular ? "border-accent" : "border-border"
                      }`}
                    >
                      {/* Popular Badge */}
                      {service.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-accent text-white px-4 py-1 rounded-full font-semibold text-xs shadow-lg whitespace-nowrap">
                            Most Popular
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Header */}
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {service.name || "Service"}
                          </h3>
                          <p className="text-sm text-text-secondary mb-4">
                            {service.subtitle || "Service description"}
                          </p>

                          {/* Pricing */}
                          <div className="mb-4">
                            <div className="flex items-baseline justify-center space-x-2 mb-2">
                              <span className="text-2xl font-bold text-primary">
                                {formatPrice(service.price, selectedCurrency)}
                              </span>
                              {service.originalPrice && (
                                <span className="text-base text-text-secondary line-through">
                                  {formatPrice(
                                    service.originalPrice,
                                    selectedCurrency
                                  )}
                                </span>
                              )}
                              <span className="text-xs text-text-secondary">
                                /{service.duration || "service"}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary">
                              Perfect for {service.idealFor || "your needs"}
                            </p>
                            {service.guarantee && (
                              <p className="text-xs text-green-600 font-semibold mt-1">
                                {service.guarantee}
                              </p>
                            )}
                          </div>

                          {/* Ideal For Badge */}
                          <div
                            className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-2 mb-4`}
                          >
                            <div className="flex items-center justify-center space-x-2">
                              <Icon
                                name="Target"
                                size={14}
                                color={
                                  colorClasses.text?.replace("text-", "#") ||
                                  "#1B365D"
                                }
                              />
                              <span
                                className={`text-xs font-semibold ${colorClasses.text}`}
                              >
                                {service.idealFor}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center space-x-2">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              color="#1B365D"
                            />
                            <span>What's Included</span>
                          </h4>
                          <ul className="space-y-2">
                            {(service.features || [])
                              .slice(0, 5)
                              .map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start space-x-2"
                                >
                                  <Icon
                                    name="Check"
                                    size={14}
                                    color="#38A169"
                                    className="mt-0.5 flex-shrink-0"
                                  />
                                  <span className="text-xs text-text-secondary">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            {(service.features || []).length > 5 && (
                              <li className="text-xs text-accent font-medium pl-5">
                                +{service.features.length - 5} more features
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Deliverables */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center space-x-2">
                            <Icon name="Package" size={16} color="#1B365D" />
                            <span>Deliverables</span>
                          </h4>
                          <ul className="space-y-2">
                            {(service.deliverables || [])
                              .slice(0, 3)
                              .map((deliverable, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start space-x-2"
                                >
                                  <Icon
                                    name="FileText"
                                    size={12}
                                    color="#FF9900"
                                    className="mt-0.5 flex-shrink-0"
                                  />
                                  <span className="text-xs text-text-secondary">
                                    {deliverable}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => handleBookingClick(service.name)}
                          className={`w-full text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                            colorClasses.button ||
                            "bg-primary hover:bg-primary-dark"
                          }`}
                        >
                          {service.buttonText || "Get Started"}
                        </button>

                        {/* Guarantee */}
                        {service.guarantee && (
                          <div className="mt-3 text-center">
                            <div className="flex items-center justify-center space-x-2 text-xs text-green-600">
                              <Icon name="Shield" size={14} color="#38A169" />
                              <span className="font-medium">
                                {service.guarantee}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Previous service"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                >
                  <Icon name="ChevronLeft" size={20} color="#1B365D" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next service"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                >
                  <Icon name="ChevronRight" size={20} color="#1B365D" />
                </button>
              </>
            )}
          </div>

          {/* Carousel Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to service ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-2 bg-accent"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-surface px-4 sm:px-6 md:px-8 py-4 md:py-6">
            <h3 className="text-xl sm:text-2xl font-bold text-primary text-center">
              {comparisonData.title || "Detailed Service Comparison"}
            </h3>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="text-left p-3 lg:p-4 font-semibold text-primary text-sm lg:text-base">
                    Feature
                  </th>
                  <th className="text-center p-3 lg:p-4 font-semibold text-primary text-sm lg:text-base">
                    Consultation
                  </th>
                  <th className="text-center p-3 lg:p-4 font-semibold text-primary text-sm lg:text-base">
                    Mentorship
                  </th>
                  <th className="text-center p-3 lg:p-4 font-semibold text-primary text-sm lg:text-base">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {(comparisonData.features || []).map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-border hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 lg:p-4 font-medium text-text-primary text-sm lg:text-base">
                      {row.feature}
                    </td>
                    <td className="p-3 lg:p-4 text-center">
                      {typeof row.consultation === "boolean" ? (
                        row.consultation ? (
                          <Icon
                            name="Check"
                            size={20}
                            color="#38A169"
                            className="mx-auto"
                          />
                        ) : (
                          <Icon
                            name="X"
                            size={20}
                            color="#E53E3E"
                            className="mx-auto"
                          />
                        )
                      ) : (
                        <span className="text-text-secondary text-sm">
                          {row.consultation}
                        </span>
                      )}
                    </td>
                    <td className="p-3 lg:p-4 text-center">
                      {typeof row.mentorship === "boolean" ? (
                        row.mentorship ? (
                          <Icon
                            name="Check"
                            size={20}
                            color="#38A169"
                            className="mx-auto"
                          />
                        ) : (
                          <Icon
                            name="X"
                            size={20}
                            color="#E53E3E"
                            className="mx-auto"
                          />
                        )
                      ) : (
                        <span className="text-text-secondary text-sm">
                          {row.mentorship}
                        </span>
                      )}
                    </td>
                    <td className="p-3 lg:p-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Icon
                            name="Check"
                            size={20}
                            color="#38A169"
                            className="mx-auto"
                          />
                        ) : (
                          <Icon
                            name="X"
                            size={20}
                            color="#E53E3E"
                            className="mx-auto"
                          />
                        )
                      ) : (
                        <span className="text-text-secondary text-sm">
                          {row.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden divide-y divide-border">
            {(comparisonData.features || []).map((row, index) => (
              <div key={index} className="p-4">
                <h4 className="font-semibold text-primary mb-3 text-sm">
                  {row.feature}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      Consultation
                    </span>
                    {typeof row.consultation === "boolean" ? (
                      row.consultation ? (
                        <Icon name="Check" size={16} color="#38A169" />
                      ) : (
                        <Icon name="X" size={16} color="#E53E3E" />
                      )
                    ) : (
                      <span className="text-xs text-text-secondary">
                        {row.consultation}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      Mentorship
                    </span>
                    {typeof row.mentorship === "boolean" ? (
                      row.mentorship ? (
                        <Icon name="Check" size={16} color="#38A169" />
                      ) : (
                        <Icon name="X" size={16} color="#E53E3E" />
                      )
                    ) : (
                      <span className="text-xs text-text-secondary">
                        {row.mentorship}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      Enterprise
                    </span>
                    {typeof row.enterprise === "boolean" ? (
                      row.enterprise ? (
                        <Icon name="Check" size={16} color="#38A169" />
                      ) : (
                        <Icon name="X" size={16} color="#E53E3E" />
                      )
                    ) : (
                      <span className="text-xs text-text-secondary">
                        {row.enterprise}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <div className="bg-green-50 border border-green-200 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
              <Icon
                name="Shield"
                size={28}
                color="#38A169"
                className="sm:w-8 sm:h-8"
              />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 text-center">
                {servicesData.guarantee?.title || "100% Satisfaction Guarantee"}
              </h3>
            </div>
            <p className="text-green-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              {servicesData.guarantee?.description ||
                "If you're not completely satisfied with the results within the first 30 days, I'll refund your investment completely. No questions asked."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
