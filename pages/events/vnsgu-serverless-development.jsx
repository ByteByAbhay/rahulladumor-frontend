import React, { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import MetaHead from "../../components/MetaHead";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import { personalInfo } from "../../config/personalInfo";
import { getEventBySlug } from "../../config/eventsConfig";

import { fetchProfileData } from '../../services/profileService';


export default function VNSGUServerlessEvent({profileData}) {
  console.log("🚀 ~ VNSGUServerlessEvent ~ profileData:", profileData)
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  // Get VNSGU event data
  const event = getEventBySlug("vnsgu-serverless-development");

  if (!event) {
    return (
      <MainLayout profileData={profileData}>
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Event Not Found
            </h1>
            <p className="text-text-secondary mb-8">
              The event information is not available.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const seo = {
    title: `${event.title} | VNSGU Guest Lecture | Rahul Ladumor`,
    description: `${event.description} Presented at ${event.venue} to ${event.audience}. Learn about serverless architecture, AWS Lambda, cost efficiency, and automatic scalability.`,
    keywords: [
      "Serverless Development",
      "VNSGU Guest Lecture",
      "NSGU Expert Talk",
      "AWS Lambda",
      "VNSGU",
      "Veer Narmad South Gujarat University",
      "VNSGU Serverless Development",
      "Guest Lecture",
      "Serverless Architecture",
      "AWS Community Builder",
      "Cloud Computing",
      "Serverless Framework",
      "AWS Speaker",
      "University Lecture",
      ...event.technologies,
    ],
    canonicalUrl: "https://www.rahulladumor.in/events/vnsgu-serverless-development",
    openGraph: {
      title: `${event.title} | VNSGU University`,
      description: `Guest lecture on serverless development at VNSGU University. Learn how serverless means writing code, not running servers, with real-world examples from AWS Community Builder Rahul Ladumor.`,
      url: "https://www.rahulladumor.in/events/vnsgu-serverless-development",
      image: event.image,
      type: "article",
    },
  };

  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />

      <div className="min-h-screen bg-surface">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] pt-11 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          {/* University Logos */}
          <div className="absolute top-16 left-2 md:top-24 md:left-8 z-10">
            <div className="flex items-center space-x-1.5 md:space-x-3">
              {/* VNSGU Logo */}
              <a
                href="https://www.vnsgu.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-sm p-1.5 md:p-3 rounded-md md:rounded-lg hover:bg-white transition-all duration-200 shadow-md md:shadow-lg group"
                title="Veer Narmad South Gujarat University"
              >
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Icon name="GraduationCap" size={16} className="text-primary md:w-6 md:h-6" />
                  <div className="hidden sm:block">
                    <p className="text-[9px] md:text-xs font-semibold text-primary leading-tight">VNSGU</p>
                    <p className="text-[7px] md:text-[10px] text-text-secondary leading-tight">University</p>
                  </div>
                </div>
              </a>

              {/* Department Logo */}
              <a
                href="https://vnsgu.ac.in/departments/dict/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-sm p-1.5 md:p-3 rounded-md md:rounded-lg hover:bg-white transition-all duration-200 shadow-md md:shadow-lg group"
                title="Department of Information & Communication Technology"
              >
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Icon name="Building" size={16} className="text-secondary md:w-6 md:h-6" />
                  <div className="hidden sm:block">
                    <p className="text-[9px] md:text-xs font-semibold text-primary leading-tight">DICT</p>
                    <p className="text-[7px] md:text-[10px] text-text-secondary leading-tight">Department</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Event Header Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-accent text-white text-sm px-4 py-2 rounded-full font-semibold">
                  {event.type}
                </span>
                {event.featured && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-semibold flex items-center space-x-1">
                    <Icon name="Star" size={16} />
                    <span>Featured Event</span>
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">{event.event}</p>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={20} />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={20} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} />
                  <span>{event.audience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} />
                  <span>{event.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-text-secondary">
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <Icon name="ChevronRight" size={16} />
              </li>
              <li>
                <button
                  onClick={() => router.push("/events")}
                  className="hover:text-primary transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <Icon name="ChevronRight" size={16} />
              </li>
              <li className="text-primary font-semibold">VNSGU Serverless Development</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center space-x-2">
                  <Icon name="FileText" size={24} />
                  <span>About This Lecture</span>
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg mb-6">
                  {event.description}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  This comprehensive guest lecture covered the fundamentals of serverless architecture,
                  demonstrating how modern cloud applications can be built without managing servers.
                  Students learned about AWS Lambda, automatic scaling, cost optimization, and real-world
                  use cases from enterprise projects at companies like KFC, HBO, ProtectOnce, NTT Data,
                  and ASTM International.
                </p>
              </div>

              {/* What is Serverless Section */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-8 mb-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                  <Icon name="Zap" size={24} />
                  <span>What is Serverless?</span>
                </h2>
                <p className="text-lg mb-4 font-semibold">
                  Serverless means writing code, not running servers.
                </p>
                <p className="leading-relaxed opacity-90">
                  You focus purely on application logic—no need to manage, provision, or maintain
                  infrastructure. The cloud provider handles all the server management, scaling,
                  and availability automatically.
                </p>
              </div>

              {/* Key Takeaways */}
              {event.keyTakeaways && event.keyTakeaways.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                    <Icon name="CheckCircle" size={24} />
                    <span>Why Serverless? Key Benefits</span>
                  </h2>
                  <ul className="space-y-4">
                    {event.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-text-secondary"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <Icon name="Check" size={16} color="#FF9900" />
                        </div>
                        <span className="text-base leading-relaxed">
                          {takeaway}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                    <Icon name="Award" size={24} />
                    <span>Event Highlights</span>
                  </h2>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-text-secondary"
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <span className="text-base leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Covered */}
              {event.technologies && event.technologies.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                    <Icon name="Code" size={24} />
                    <span>Technologies Covered</span>
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {event.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-surface text-primary px-4 py-2 rounded-lg font-semibold text-sm border border-border hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                    <Icon name="Image" size={24} />
                    <span>Event Gallery</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.gallery.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => setSelectedImage(photo)}
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm">{photo.caption}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub Repository */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <Icon name="Github" size={28} color="#ffffff" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                        <span>Live Demo Repository</span>
                      </h2>
                      <p className="text-gray-300 text-sm">Hands-on serverless application code</p>
                    </div>
                  </div>

                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="BookOpen" size={18} color="#58a6ff" />
                          <a
                            href="https://github.com/rahulladumor/serverless-app-vnsgu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors"
                          >
                            rahulladumor/serverless-app-vnsgu
                          </a>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Complete serverless application demo built during the VNSGU guest lecture. 
                          Includes AWS Lambda functions, API Gateway setup, DynamoDB integration, and deployment scripts.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30 font-medium">
                        AWS Lambda
                      </span>
                      <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30 font-medium">
                        Node.js
                      </span>
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30 font-medium">
                        Serverless Framework
                      </span>
                      <span className="bg-orange-500/20 text-orange-300 text-xs px-3 py-1 rounded-full border border-orange-500/30 font-medium">
                        DynamoDB
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                          <Icon name="Star" size={16} />
                          <span className="font-bold">Star</span>
                        </div>
                        <p className="text-gray-400 text-xs">Give it a star</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
                          <Icon name="GitFork" size={16} />
                          <span className="font-bold">Fork</span>
                        </div>
                        <p className="text-gray-400 text-xs">Fork & modify</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                          <Icon name="Code" size={16} />
                          <span className="font-bold">Clone</span>
                        </div>
                        <p className="text-gray-400 text-xs">Run locally</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://github.com/rahulladumor/serverless-app-vnsgu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-white hover:bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-bold transition-all duration-200 group shadow-lg"
                  >
                    <Icon name="Github" size={20} />
                    <span>View Repository on GitHub</span>
                    <Icon
                      name="ExternalLink"
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>

                  <div className="mt-4 flex items-center justify-center space-x-4 text-gray-400 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="GitBranch" size={14} />
                      <span>main</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="FileCode" size={14} />
                      <span>MIT License</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>Updated Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              {event.slides && (
                <div className="bg-white rounded-xl shadow-lg p-8 border border-border mt-8">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                    <Icon name="Download" size={24} />
                    <span>Download Resources</span>
                  </h2>
                  <div className="space-y-4">
                    <a
                      href={event.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-primary hover:text-white transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={20} />
                        <div>
                          <span className="font-semibold block">
                            Presentation Slides
                          </span>
                          <span className="text-sm opacity-75">
                            Serverless Development.pptx
                          </span>
                        </div>
                      </div>
                      <Icon
                        name="Download"
                        size={20}
                        className="group-hover:translate-y-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Sticky Container for all sidebar content */}
              <div className="sticky top-24 space-y-8">
              {/* Event Details Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-6">
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-1">
                      <Icon name="Calendar" size={18} />
                      <span className="font-semibold text-sm">Date</span>
                    </div>
                    <p className="text-primary ml-6">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-1">
                      <Icon name="MapPin" size={18} />
                      <span className="font-semibold text-sm">Location</span>
                    </div>
                    <p className="text-primary ml-6">{event.location}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-1">
                      <Icon name="Building" size={18} />
                      <span className="font-semibold text-sm">Venue</span>
                    </div>
                    <p className="text-primary ml-6">{event.venue}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-1">
                      <Icon name="Users" size={18} />
                      <span className="font-semibold text-sm">Audience</span>
                    </div>
                    <p className="text-primary ml-6">{event.audience}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-1">
                      <Icon name="Clock" size={18} />
                      <span className="font-semibold text-sm">Duration</span>
                    </div>
                    <p className="text-primary ml-6">{event.duration}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => router.push("/contact")}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Icon name="Mail" size={18} />
                    <span>Book Me to Speak</span>
                  </button>
                </div>
              </div>

              {/* Speaker Card */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">About the Speaker</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={personalInfo.image}
                    alt={personalInfo.name}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="font-bold text-lg">{personalInfo.name}</p>
                    <p className="text-sm opacity-90">AWS Community Builder</p>
                  </div>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Senior AWS Solution Architect with 8+ years of expertise in
                  serverless architecture, cloud optimization, and DevOps automation.
                  4x AWS Community Builder and 3x AWS Certified.
                </p>
                <button
                  onClick={() => router.push("/about")}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>View Full Profile</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-lg font-bold text-primary mb-4">Share This Event</h3>
                <div className="flex space-x-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      event.title
                    )}&url=${encodeURIComponent(
                      "https://www.rahulladumor.in/events/vnsgu-serverless-development"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-surface hover:bg-primary hover:text-white p-3 rounded-lg flex items-center justify-center transition-all border border-border"
                    aria-label="Share on Twitter"
                  >
                    <Icon name="Twitter" size={20} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      "https://www.rahulladumor.in/events/vnsgu-serverless-development"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-surface hover:bg-primary hover:text-white p-3 rounded-lg flex items-center justify-center transition-all border border-border"
                    aria-label="Share on LinkedIn"
                  >
                    <Icon name="Linkedin" size={20} />
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://www.rahulladumor.in/events/vnsgu-serverless-development"
                      );
                      alert("Link copied to clipboard!");
                    }}
                    className="flex-1 bg-surface hover:bg-primary hover:text-white p-3 rounded-lg flex items-center justify-center transition-all border border-border"
                    aria-label="Copy link"
                  >
                    <Icon name="Link" size={20} />
                  </button>
                </div>
              </div>
              </div>
              {/* End Sticky Container */}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/events")}
              className="inline-flex items-center space-x-2 text-primary hover:text-accent font-semibold transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to All Events</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
              aria-label="Close modal"
            >
              <Icon name="X" size={24} />
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-lg">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
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
