import React, { useState } from "react";
import MainLayout from "../components/ui/MainLayout";
import MetaHead from "../components/MetaHead";
import Icon from "../components/AppIcon";
import Image from "../components/AppImage";
import { useRouter } from "next/router";
import { speakingEvents, getEventTypes } from "../config/eventsConfig";
import { fetchProfileData } from "../services/profileService";

export default function EventsPage({profileData}) {
  const router = useRouter();
  const [filterType, setFilterType] = useState("all");

  // Get unique event types
  const eventTypes = ["all", ...getEventTypes()];

  // Filter events
  const filteredEvents =
    filterType === "all"
      ? speakingEvents
      : speakingEvents.filter((e) => e.type === filterType);

  const seo = {
    title: "Speaking Events & Conferences | Rahul Ladumor",
    description:
      "Explore Rahul Ladumor's speaking engagements at AWS re:Invent, DevOps summits, and cloud conferences. Learn from real-world AWS architecture, cost optimization, and serverless expertise.",
    keywords: [
      "AWS Speaker",
      "University Lecture",
      "University Guest Lecture",
      "Cloud Conference Speaker",
      "DevOps Speaker",
      "AWS re:Invent",
      "Tech Talks",
      "Cloud Architecture",
      "Serverless Speaker",
      "AWS Community Builder",
    ],
    canonicalUrl: "https://www.rahulladumor.in/events",
    openGraph: {
      title: "Speaking Events & Conferences | Rahul Ladumor - AWS Expert",
      description:
        "Join Rahul at major cloud conferences and tech events. Expert sessions on AWS cost optimization, serverless architecture, and DevOps best practices.",
      url: "https://www.rahulladumor.in/events",
    },
  };

  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />

      <div className="min-h-screen bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Speaking Events & Conferences
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Join me at conferences, meetups, and webinars where I share
              insights on AWS architecture, cost optimization, serverless
              applications, and cloud best practices.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-border">
              <div className="text-3xl font-bold text-accent mb-2">
                {speakingEvents.length}+
              </div>
              <p className="text-sm text-text-secondary">Total Events</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-border">
              <div className="text-3xl font-bold text-accent mb-2">
                {speakingEvents.reduce((acc, e) => {
                  const match = e.audience?.match(/(\d+)/);
                  return acc + (match ? parseInt(match[1]) : 0);
                }, 0)}
                +
              </div>
              <p className="text-sm text-text-secondary">Total Attendees</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-border">
              <div className="text-3xl font-bold text-accent mb-2">
                {new Set(speakingEvents.map((e) => e.location)).size}+
              </div>
              <p className="text-sm text-text-secondary">Cities</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-border">
              <div className="text-3xl font-bold text-accent mb-2">
                {eventTypes.length - 1}
              </div>
              <p className="text-sm text-text-secondary">Event Types</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  filterType === type
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-primary hover:bg-primary/10 border border-border"
                }`}
              >
                {type === "all" ? "All Events" : type}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border cursor-pointer"
                  onClick={() => router.push(event.staticPage || `/events/${event.slug}`)}
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Featured Badge */}
                    {event.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                          <Icon name="Star" size={12} />
                          <span>Featured</span>
                        </span>
                      </div>
                    )}

                    {/* Event Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {event.type}
                      </span>
                    </div>

                    {/* Event Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl mb-1">
                        {event.event}
                      </h3>
                      <p className="text-white/90 text-sm">{event.topic}</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-primary mb-3 line-clamp-2">
                      {event.title}
                    </h4>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-text-secondary">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary">
                        <Icon name="MapPin" size={16} className="mr-2" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary">
                        <Icon name="Users" size={16} className="mr-2" />
                        <span>{event.audience}</span>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary">
                        <Icon name="Clock" size={16} className="mr-2" />
                        <span>{event.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.technologies?.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-surface text-primary text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {event.technologies?.length > 3 && (
                        <span className="bg-surface text-primary text-xs px-2 py-1 rounded-full font-medium">
                          +{event.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2 group"
                      aria-label={`View details for ${event.event}`}
                    >
                      <span>View Details</span>
                      <Icon
                        name="ArrowRight"
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Icon
                name="Calendar"
                size={64}
                className="mx-auto mb-4 text-text-secondary"
              />
              <p className="text-xl text-text-secondary">
                No events found for this filter.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Want Me to Speak at Your Event?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              I'm available for conferences, workshops, webinars, and corporate
              training on AWS, serverless architecture, cost optimization, and
              DevOps best practices.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg"
            >
              <Icon name="Mail" size={20} />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


export async function getStaticProps() {
  try {
    const profileData = await fetchProfileData();
    
    return {
      props: {
        profileData,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    
    // Return fallback data to prevent build failure
    return {
      props: {
        profileData: {
          heroSection: {},
          problemSection: {},
          solutionSection: {},
          credentialsSection: {},
          servicesSection: {},
          testimonialsSection: {},
          caseStudiesSection: {},
          aboutSection: {},
          contactSection: {}
        },
      },
    };
  }
}
