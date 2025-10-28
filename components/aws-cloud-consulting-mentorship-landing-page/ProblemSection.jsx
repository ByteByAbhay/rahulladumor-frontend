import React, { useState } from "react";
import Icon from "components/AppIcon";
import { useRouter } from "next/navigation";

const ProblemSection = ({ profileData }) => {
  const personalInfo = profileData || {};

  const router = useRouter();

  // Get problem section data from personalInfo with fallbacks
  const problemData = personalInfo.problemSection || {};
  const costCalculator = problemData.costCalculator || {};

  const [currentSpend, setCurrentSpend] = useState(
    costCalculator.defaultSpend || 10000
  );
  const [potentialSavings, setPotentialSavings] = useState(
    (costCalculator.defaultSpend || 10000) *
      (costCalculator.savingsPercentage || 0.4)
  );

  // Use problems from personalInfo with fallback
  const problems = problemData.problems || [];

  // Get cost reduction percentage from personalInfo or use from costCalculator
  const costReductionPercentage =
    parseInt(
      personalInfo.metrics?.find(
        (m) =>
          m.label?.includes("Cost Reduction") ||
          m.label?.includes("Average Cost")
      )?.value
    ) / 100 ||
    costCalculator.savingsPercentage ||
    0.4;

  const handleSpendChange = (value) => {
    setCurrentSpend(value);
    setPotentialSavings(Math.round(value * costReductionPercentage));
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 px-4">
            {problemData.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            After {personalInfo.experience?.years || "8+"} years of experience
            and helping {personalInfo.experience?.companies || "10+"} companies,
            I've seen these critical cloud challenges drain resources and limit
            growth potential.
          </p>
        </div>

        {/* Interactive Cost Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {costCalculator.title}
            </h3>
            <p className="text-text-secondary">
              Based on my proven track record of achieving{" "}
              {personalInfo.metrics?.find((m) =>
                m.label?.includes("Cost Reduction")
              )?.value || "60%"}{" "}
              average cost reduction
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <label htmlFor="awsSpendRange" className="block text-sm font-medium text-text-primary mb-4">
                Current Monthly AWS Spend ({costCalculator.currency || "₹"})
              </label>
              <input
                id="awsSpendRange"
                type="range"
                min={costCalculator.minSpend || 5000}
                max={costCalculator.maxSpend || 500000}
                step={costCalculator.step || 5000}
                value={currentSpend}
                onChange={(e) => handleSpendChange(parseInt(e.target.value))}
                aria-label={`AWS monthly spend slider, current value: ${costCalculator.currency || "₹"}${currentSpend.toLocaleString()}`}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-2">
                <span>
                  {costCalculator.currency || "₹"}
                  {((costCalculator.minSpend || 5000) / 1000).toFixed(0)}K
                </span>
                <span className="font-semibold text-primary">
                  {costCalculator.currency || "₹"}
                  {currentSpend.toLocaleString()}
                </span>
                <span>
                  {costCalculator.currency || "₹"}
                  {((costCalculator.maxSpend || 500000) / 100000).toFixed(0)}L+
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <Icon
                  name="TrendingUp"
                  size={32}
                  color="#E53E3E"
                  className="mx-auto mb-3"
                />
                <h4 className="font-semibold text-red-800 mb-2">
                  Current Spend
                </h4>
                <p className="text-2xl font-bold text-red-600">
                  {costCalculator.currency || "₹"}
                  {currentSpend.toLocaleString()}
                </p>
                <p className="text-sm text-red-600 mt-1">per month</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Icon
                  name="TrendingDown"
                  size={32}
                  color="#38A169"
                  className="mx-auto mb-3"
                />
                <h4 className="font-semibold text-green-800 mb-2">
                  Potential Savings
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {costCalculator.currency || "₹"}
                  {potentialSavings.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  per month ({Math.round(costReductionPercentage * 100)}%
                  reduction)
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-lg font-semibold text-primary">
                Annual Savings: {costCalculator.currency || "₹"}
                {(potentialSavings * 12).toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Based on my proven results with{" "}
                {personalInfo.experience?.companies || "10+"} companies over{" "}
                {personalInfo.experience?.years || "8+"} years
              </p>
            </div>
          </div>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <Icon name={problem.icon} size={24} color="#E53E3E" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {problem.title || "Challenge"}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {problem.description || "Description of the challenge"}
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} color="#E53E3E" />
                      <span className="text-sm font-semibold text-red-800">
                        Impact: {problem.impact || "Significant impact"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {problemData.cta?.title ||
                "Stop Losing Money on Inefficient AWS Usage"}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              As a {personalInfo.title || "AWS Cloud Expert"}, I'll provide a
              free architecture review and show you exactly where you're
              overspending
            </p>
            <button
              onClick={() => {
                router.push("/booking");
              }}
              className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 cta-shadow inline-flex items-center space-x-2"
            >
              <Icon
                name={problemData.cta?.buttonIcon || "Calculator"}
                size={20}
              />
              <span>
                {problemData.cta?.buttonText || "Get Free Cost Analysis"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff9900;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff9900;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
