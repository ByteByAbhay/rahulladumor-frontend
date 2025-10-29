import React from "react";
import Icon from "../AppIcon";

const ServiceTools = ({ tools }) => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Technologies & Platforms
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We leverage industry-leading tools and platforms to deliver exceptional results
          </p>
        </div>

        {/* Tools Categories */}
        <div className="space-y-12">
          {tools.categories.map((category, index) => (
            <div key={index}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category.icon} className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-text-secondary text-sm">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Tool Icon/Logo */}
                      {tool.icon && (
                        <div className="w-12 h-12 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon
                            name={tool.icon}
                            className="w-8 h-8 text-primary"
                          />
                        </div>
                      )}

                      {/* Tool Name */}
                      <div className="font-semibold text-primary mb-1">
                        {tool.name}
                      </div>

                      {/* Tool Description */}
                      {tool.description && (
                        <div className="text-xs text-text-secondary">
                          {tool.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {tools.note && (
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary">{tools.note}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceTools;
