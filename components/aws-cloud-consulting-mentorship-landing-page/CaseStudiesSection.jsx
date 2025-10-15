import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { useRouter } from 'next/navigation';

const CaseStudiesSection = ({ profileData }) => {
  const router = useRouter();
  const personalInfo = profileData || {};
  // Get case studies section data from personalInfo with fallbacks
  const caseStudiesData = personalInfo.caseStudiesSection || {};
  const caseStudies = caseStudiesData.caseStudies || [];
  const cta = caseStudiesData.cta || {};

  const [selectedCase, setSelectedCase] = useState(0);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {caseStudiesData.title || "Success Stories with Measurable Impact"}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {caseStudiesData.subtitle || "Deep-dive into real client transformations with detailed metrics, timelines, and quantified business outcomes."}
          </p>
          {/* Case Study Navigation */}
          {caseStudies.length > 1 && (
            <div className="flex justify-center space-x-4 mt-8">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCase(index)}
                  aria-label={`View case study ${index + 1}: ${caseStudies[index]?.company || 'Case Study'}`}
                  aria-current={index === selectedCase ? "true" : "false"}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${index === selectedCase ? 'bg-accent' : 'bg-border hover:bg-primary'
                    }`}
                />
              ))}
            </div>
          )}
        </div>


        {/* Case Study Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((caseStudy, index) => (
            <button
              key={caseStudy.id}
              onClick={() => setSelectedCase(index)}
              aria-label={`Select ${caseStudy.company} case study`}
              aria-current={selectedCase === index ? "true" : "false"}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedCase === index
                ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-surface border border-border'
                }`}
            >
              {caseStudy.company}
            </button>
          ))}
        </div>

        {/* Main Case Study Display */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="relative">
            <Image
              src={caseStudies[selectedCase]?.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"}
              alt={caseStudies[selectedCase]?.title || "Case Study"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {caseStudies[selectedCase]?.title || "Case Study"}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                <span className="flex items-center space-x-1">
                  <Icon name="Building" size={16} />
                  <span>{caseStudies[selectedCase]?.company || "Company"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Tag" size={16} />
                  <span>{caseStudies[selectedCase]?.industry || "Industry"}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Challenge */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                <Icon name="AlertTriangle" size={24} color="#E53E3E" />
                <span>The Challenge</span>
              </h4>
              <p className="text-text-secondary text-lg leading-relaxed">
                {caseStudies[selectedCase]?.challenge || "Challenge description"}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(caseStudies[selectedCase]?.metrics || {}).map(([key, value]) => (
                <div key={key} className="text-center bg-accent/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent mb-1">{value}</div>
                  <div className="text-sm text-text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Before vs After */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={18} color="#DC2626" />
                  <span>Challenge</span>
                </h4>
                <p className="text-red-700">{caseStudies[selectedCase]?.challenge || "Challenge description"}</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                  <Icon name="TrendingUp" size={18} color="#38A169" />
                  <span>Results</span>
                </h4>
                <div className="space-y-3">
                  {Object.entries(caseStudies[selectedCase]?.afterStats || {}).map(([key, value], index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-green-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-semibold text-green-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                <Icon name="Lightbulb" size={24} color="#FF9900" />
                <span>The Solution</span>
              </h4>
              <p className="text-text-primary leading-relaxed mb-4">{caseStudies[selectedCase]?.solution || "Solution description"}</p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2">
                {(caseStudies[selectedCase]?.technologies || []).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                <Icon name="CheckCircle" size={24} color="#38A169" />
                <span>Measurable Results</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} color="#1B365D" />
                    <span className="font-semibold text-primary">Timeline</span>
                  </div>
                  <p className="text-text-secondary">{caseStudies[selectedCase]?.timeline || "Timeline"}</p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Users" size={16} color="#1B365D" />
                    <span className="font-semibold text-primary">Team Size</span>
                  </div>
                  <p className="text-text-secondary">{caseStudies[selectedCase]?.teamSize || "Team Size"}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {(caseStudies[selectedCase]?.results || []).map((result, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} color="#38A169" className="mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Quote */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex items-start space-x-4">
                <Icon name="Quote" size={32} color="#FF9900" className="flex-shrink-0 mt-2" />
                <div>
                  <blockquote className="text-lg italic mb-4">
                    "{caseStudies[selectedCase]?.clientQuote || "Client quote"}"
                  </blockquote>
                  <cite className="text-accent font-semibold">
                    — {caseStudies[selectedCase]?.company || "Company"} Leadership Team
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {cta.title}
            </h3>
            <p className="text-lg text-text-secondary mb-6">
              {cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  router.push('/booking');
                }}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 cta-shadow inline-flex items-center justify-center space-x-2"
              >
                <Icon name={cta.primaryButton.icon} size={20} />
                <span>{cta.primaryButton.text}</span>
              </button>

              {/* <button
                onClick={() => {
                  router.push('/reviews');
                }}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Icon name={cta.secondaryButton.icon} size={20} />
                <span>{cta.secondaryButton.text}</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;