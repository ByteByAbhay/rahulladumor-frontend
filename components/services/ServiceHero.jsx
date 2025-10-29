import React from "react";
import { useRouter } from "next/router";
import Icon from "../AppIcon";

const ServiceHero = ({ service }) => {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary py-20 md:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center text-sm text-white/80">
            <button
              onClick={() => router.push("/")}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <Icon name="ChevronRight" className="w-4 h-4 mx-2" />
            <button
              onClick={() => router.push("/services")}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <Icon name="ChevronRight" className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">{service.title}</span>
          </nav>

          {/* Icon Badge */}
          {service.icon && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <Icon name={service.icon} className="w-10 h-10 text-white" />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {service.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {service.subtitle}
          </p>

          {/* Stats */}
          {service.stats && service.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {service.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/booking")}
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              Book Free Consultation
              <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border-2 border-white/30 flex items-center gap-2"
            >
              <Icon name="MessageSquare" className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
