import React from "react";
import Icon from "../AppIcon";

const ServiceProcess = ({ process }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Proven Process
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            A systematic approach to ensure successful cloud transformation
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-accent transform -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-24">
            {process.steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step Number Circle */}
                <div className="hidden lg:flex absolute left-1/2 top-8 lg:top-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 w-full ${
                    index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"
                  }`}
                >
                  <div className="bg-surface p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    {/* Mobile Step Number */}
                    <div className="flex lg:hidden items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-xl font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary">
                        {step.title}
                      </h3>
                    </div>

                    {/* Desktop Title */}
                    <h3 className="hidden lg:block text-2xl font-bold text-primary mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Deliverables */}
                    {step.deliverables && step.deliverables.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <Icon name="CheckCircle2" className="w-5 h-5" />
                          Key Deliverables:
                        </h4>
                        <ul className="space-y-2">
                          {step.deliverables.map((deliverable, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-text-secondary"
                            >
                              <Icon
                                name="Check"
                                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                              />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Duration */}
                    {step.duration && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Icon name="Clock" className="w-4 h-4" />
                          <span className="font-medium">Duration:</span>
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
