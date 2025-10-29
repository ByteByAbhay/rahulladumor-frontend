import React from "react";
import { useRouter } from "next/router";
import Icon from "../AppIcon";

const ServiceCTA = ({ service }) => {
  const router = useRouter();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Icon Badge */}
              {service.ctaIcon && (
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl mb-6 shadow-lg">
                  <Icon name={service.ctaIcon} className="w-8 h-8 text-white" />
                </div>
              )}

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
                {service.ctaTitle || "Ready to Get Started?"}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.ctaDescription ||
                  "Let's discuss how we can help transform your cloud infrastructure and drive business growth."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => router.push("/booking")}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-orange-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Icon name="Calendar" className="w-5 h-5" />
                  Book Free Consultation
                  <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="px-8 py-4 bg-gray-100 text-primary font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-200"
                >
                  <Icon name="MessageSquare" className="w-5 h-5" />
                  Contact Us
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Award" className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">4x AWS Builder</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">100+ Clients</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">60% Savings</span>
                </div>
              </div>
            </div>

            {/* Right Side - Why Choose Us Cards */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Why Choose Us?
              </h3>
              
              {service.whyChooseUs && service.whyChooseUs.length > 0 ? (
                <div className="space-y-4">
                  {service.whyChooseUs.slice(0, 3).map((point, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-accent/50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={point.icon} className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary mb-1">
                            {point.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Award" className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          Proven Expertise
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          4x AWS Community Builder with years of hands-on experience
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle" className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          Guaranteed Results
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          We deliver measurable outcomes or your money back
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Zap" className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          Fast Implementation
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Quick turnaround times without compromising quality
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional CTA */}
              <div className="mt-8 p-6 bg-white rounded-xl border-2 border-dashed border-accent/30">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-semibold text-primary">Limited Time:</span> Book this week and get a{" "}
                  <span className="text-accent font-bold">free architecture review</span> worth $500
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm opacity-80">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">&lt;24h</div>
              <div className="text-sm opacity-80">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
