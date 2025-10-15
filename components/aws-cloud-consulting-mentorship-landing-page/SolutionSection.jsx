import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { useRouter } from 'next/navigation';

const SolutionSection = ({ profileData }) => {
  const personalInfo = profileData || {};
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState(null);

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
        button: "bg-blue-600 hover:bg-blue-700"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-100",
        iconColor: "#38A169",
        text: "text-green-800",
        button: "bg-green-600 hover:bg-green-700"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "bg-purple-100",
        iconColor: "#7C3AED",
        text: "text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700"
      }
    };
    return colors[color];
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {solutionData.title || "Three Pillars of AWS Success"}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {solutionData.subtitle || "Proven methodologies that have helped startups and engineers achieve measurable results."}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const colorClasses = getColorClasses(solution.color);
            const isExpanded = expandedCard === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${isExpanded ? 'lg:col-span-3' : ''
                  }`}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 ${colorClasses.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon name={solution.icon} size={28} color={colorClasses.iconColor} />
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
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${solution.title} details`}
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
                    {solution.description || "Professional service description."}
                  </p>

                  {/* Outcome Highlight */}
                  <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-4 mb-6`}>
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} color={colorClasses.iconColor} />
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
                            <Icon name="CheckSquare" size={20} color="#1B365D" />
                            <span>Deliverables</span>
                          </h4>
                          <ul className="space-y-3">
                            {(solution.deliverables || []).map((deliverable, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <Icon name="Check" size={16} color="#38A169" className="mt-1 flex-shrink-0" />
                                <span className="text-text-secondary">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-primary mb-4 flex items-center space-x-2">
                            <Icon name="Clock" size={20} color="#1B365D" />
                            <span>Timeline & Process</span>
                          </h4>
                            <div className="bg-surface rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Icon name="Calendar" size={16} color="#FF9900" />
                                <span className="font-semibold text-primary">Duration</span>
                              </div>
                              <p className="text-text-secondary">{solution.timeline || "To be determined"}</p>
                            </div>

                            <button
                              onClick={() => {
                                router.push("/booking");
                              }}
                              aria-label={`Book consultation for ${solution.title}`}
                              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 inline-flex items-center space-x-2"
                            >
                              <Icon name="Calendar" size={20} color="white" className="mt-1 flex-shrink-0" />
                              <span>Get Started with {solution.title || "This Service"}</span>
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

        {/* Process Overview */}
        <div className="bg-surface rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            {processData.title || "How We Work Together"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(processData.steps || []).map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step || (index + 1)}
                </div>
                <h4 className="font-semibold text-primary mb-2">{item.title || "Step"}</h4>
                <p className="text-sm text-text-secondary">{item.description || "Process step description"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;