import React from "react";
import Icon from "../AppIcon";

const ServiceBenefits = ({ benefits }) => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Key Benefits
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Transform your cloud infrastructure with our proven approach
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon name={benefit.icon} className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-primary mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-4">
                {benefit.description}
              </p>

              {/* Metric (if available) */}
              {benefit.metric && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {benefit.metric}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
