import React, { useState } from "react";
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {servicesData.title || "Choose Your AWS Success Path"}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {servicesData.subtitle ||
              "Flexible engagement models designed to meet your specific needs and budget, with guaranteed results and transparent pricing."}
          </p>
          {/* </div> */}

          {/* Currency Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-text-secondary">Currency:</span>
            <div className="flex bg-surface rounded-lg p-1">
              <button
                onClick={() => setSelectedCurrency("INR")}
                aria-label="Switch to Indian Rupees pricing"
                aria-pressed={selectedCurrency === "INR"}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCurrency === "INR"
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setSelectedCurrency("USD")}
                aria-label="Switch to US Dollars pricing"
                aria-pressed={selectedCurrency === "USD"}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCurrency === "USD"
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);

            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  service.popular ? "border-accent scale-105" : "border-border"
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-white px-6 py-2 rounded-full font-semibold text-sm">
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

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-surface px-8 py-6">
            <h3 className="text-2xl font-bold text-primary text-center">
              {comparisonData.title || "Detailed Service Comparison"}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="text-left p-4 font-semibold text-primary">
                    Feature
                  </th>
                  <th className="text-center p-4 font-semibold text-primary">
                    Consultation
                  </th>
                  <th className="text-center p-4 font-semibold text-primary">
                    Mentorship
                  </th>
                  <th className="text-center p-4 font-semibold text-primary">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {(comparisonData.features || []).map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-4 font-medium text-text-primary">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center">
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
                        <span className="text-text-secondary">
                          {row.consultation}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
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
                        <span className="text-text-secondary">
                          {row.mentorship}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
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
                        <span className="text-text-secondary">
                          {row.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Shield" size={32} color="#38A169" />
              <h3 className="text-2xl font-bold text-green-800">
                {servicesData.guarantee?.title || "100% Satisfaction Guarantee"}
              </h3>
            </div>
            <p className="text-green-700 text-lg">
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
