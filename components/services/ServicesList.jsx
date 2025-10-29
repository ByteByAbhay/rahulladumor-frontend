import React from "react";
import { useRouter } from "next/router";
import Icon from "../AppIcon";
import { getAllServices } from "../../config/serviceRegistry";

/**
 * ServicesList Component
 * 
 * Displays all available services in a grid layout
 * Automatically detects services from serviceRegistry
 */
const ServicesList = ({ layout = "grid", showStats = true }) => {
  const router = useRouter();
  const services = getAllServices();

  const handleServiceClick = (servicePath) => {
    router.push(servicePath);
  };

  if (layout === "cards") {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Service Offerings
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Comprehensive cloud consulting services tailored to your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => handleServiceClick(service.path)}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-primary to-secondary p-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Stats */}
                  {showStats && service.stats && service.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                      {service.stats.slice(0, 2).map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service.path);
                    }}
                  >
                    Learn More
                    <Icon name="ArrowRight" className="w-5 h-5 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Compact list layout (for sidebars, footers, etc.)
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <button
          key={service.slug}
          onClick={() => handleServiceClick(service.path)}
          className="w-full flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-surface transition-all duration-200 border border-gray-100 hover:border-primary group text-left"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <Icon name={service.icon} className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-1 group-hover:text-primary-dark">
              {service.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-1">
              {service.subtitle}
            </p>
          </div>
          <Icon
            name="ChevronRight"
            className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors"
          />
        </button>
      ))}
    </div>
  );
};

export default ServicesList;
