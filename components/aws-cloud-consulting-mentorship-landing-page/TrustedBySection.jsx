import React from 'react';
import Icon from 'components/AppIcon';

const TrustedBySection = () => {
  const clients = [
    {
      name: "NTT Data",
      logo: "Building2",
      description: "Global IT Services",
      color: "#0066CC"
    },
    {
      name: "Kapara Co.",
      logo: "TrendingUp",
      description: "Tokyo, Japan",
      color: "#FF6B6B"
    },
    {
      name: "ProdigyBuild",
      logo: "Zap",
      description: "SF Bay Area",
      color: "#4ECDC4"
    },
    {
      name: "ProtectOnce",
      logo: "Shield",
      description: "Security Platform",
      color: "#95E1D3"
    },
    {
      name: "ASTM International",
      logo: "Award",
      description: "Standards Organization",
      color: "#F38181"
    },
    {
      name: "Turing",
      logo: "Code",
      description: "AI-Powered Hiring",
      color: "#AA96DA"
    }
  ];

  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Companies I've Worked With
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Delivering measurable results for startups to Fortune 500 companies
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${client.color}20` }}
              >
                <Icon 
                  name={client.logo} 
                  size={28} 
                  color={client.color}
                />
              </div>
              <h3 className="font-semibold text-primary text-center mb-1 text-sm">
                {client.name}
              </h3>
              <p className="text-xs text-text-secondary text-center">
                {client.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">$2M+</div>
            <p className="text-sm text-text-secondary">Total Savings Delivered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">60%</div>
            <p className="text-sm text-text-secondary">Average Cost Reduction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">99.99%</div>
            <p className="text-sm text-text-secondary">Uptime Achieved</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">200+</div>
            <p className="text-sm text-text-secondary">Engineers Mentored</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
