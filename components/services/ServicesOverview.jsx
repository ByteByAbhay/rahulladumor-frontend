import React from "react";
import { useRouter } from "next/router";
import Icon from "../AppIcon";
import { getAllServices } from "../../config/serviceRegistry";

/**
 * ServicesOverview Component
 * 
 * Displays a comprehensive overview of all services with quick links
 * Perfect for the main /services page
 */
const ServicesOverview = () => {
  const router = useRouter();
  const services = getAllServices();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 leading-tight px-2">
            Specialized Cloud Consulting Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
            From cloud migration to DevOps automation, we provide end-to-end consulting
            services to help you leverage the full power of cloud computing.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-6 sm:space-y-8">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="bg-surface rounded-lg sm:rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Content */}
                <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Key Benefits Preview */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="mb-5 sm:mb-6">
                      <h4 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                        Key Benefits:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {service.benefits.slice(0, 4).map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-text-secondary text-sm sm:text-base"
                          >
                            <Icon
                              name="Check"
                              className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5"
                            />
                            <span className="leading-snug">{benefit.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push(service.path)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg group text-sm sm:text-base"
                  >
                    View Details
                    <Icon
                      name="ArrowRight"
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                {/* Right Side - Stats */}
                {service.stats && service.stats.length > 0 && (
                  <div className="lg:w-72 bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-primary/20">
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
                      {service.stats.slice(0, 3).map((stat, idx) => (
                        <div key={idx} className="text-center lg:text-left">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 leading-none">
                            {stat.value}
                          </div>
                          <div className="text-xs sm:text-sm text-white/80 leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 md:mt-16">
          <div className="bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 md:p-12 rounded-lg sm:rounded-xl text-white text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-base sm:text-lg text-white/90 mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Book a free consultation call and we'll help you choose the right
              solution for your business goals.
            </p>
            <button
              onClick={() => router.push("/booking")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Icon name="Calendar" className="w-4 h-4 sm:w-5 sm:h-5" />
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
