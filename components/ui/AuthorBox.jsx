import React from 'react';
import Image from '../AppImage';
import Icon from '../AppIcon';
import { personalInfo } from '../../config/personalInfo';

/**
 * AuthorBox Component
 * 
 * Displays visible author information for E-E-A-T signals.
 * Google prefers visible author info, not just structured data.
 * 
 * Usage:
 * <AuthorBox /> - Default author box
 * <AuthorBox variant="compact" /> - Compact version
 * <AuthorBox showBio={false} /> - Without bio
 */
const AuthorBox = ({ 
  variant = 'default', // 'default', 'compact', 'inline'
  showBio = true,
  showSocial = true,
  showCredentials = true,
  className = ''
}) => {
  
  const author = {
    name: personalInfo.name || "Rahul Ladumor",
    image: personalInfo.image || "/assets/images/profile.avif",
    title: "AWS Solutions Architect & Cloud Consultant",
    credentials: "4x AWS Community Builder (Serverless)",
    bio: "Expert in serverless architecture, cloud cost optimization, and AI/ML integration on AWS. Helping startups and enterprises reduce AWS costs by 30-60% while improving performance and scalability.",
    experience: "8+ years of experience",
    mentored: "200+ engineers mentored",
    social: {
      linkedin: personalInfo.social?.linkedin || "https://www.linkedin.com/in/rahulladumor",
      github: personalInfo.social?.github || "https://github.com/Rahulladumor",
      twitter: personalInfo.social?.twitter || "https://twitter.com/Rahul__ladumor"
    }
  };

  // Compact variant (for article headers)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <Image
          src={author.image}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <a 
              href="/about" 
              className="font-semibold text-primary hover:text-accent transition-colors"
              rel="author"
            >
              {author.name}
            </a>
            {showCredentials && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                <Icon name="Award" size={12} className="mr-1" />
                AWS Community Builder
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">{author.title}</p>
        </div>
      </div>
    );
  }

  // Inline variant (for bylines)
  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 text-sm ${className}`}>
        <span className="text-text-secondary">By</span>
        <a 
          href="/about" 
          className="font-medium text-primary hover:text-accent transition-colors"
          rel="author"
        >
          {author.name}
        </a>
        {showCredentials && (
          <>
            <span className="text-text-secondary">•</span>
            <span className="text-text-secondary">{author.credentials}</span>
          </>
        )}
      </div>
    );
  }

  // Default variant (full author box)
  return (
    <div className={`bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-border ${className}`}>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <Image
            src={author.image}
            alt={author.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          {/* Name & Title */}
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-xl font-bold text-primary">
                Written by{' '}
                <a 
                  href="/about" 
                  className="hover:text-accent transition-colors"
                  rel="author"
                >
                  {author.name}
                </a>
              </h3>
            </div>
            <p className="text-text-secondary font-medium">{author.title}</p>
          </div>

          {/* Credentials Badge */}
          {showCredentials && (
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                <Icon name="Award" size={14} className="mr-1.5" />
                {author.credentials}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Icon name="Briefcase" size={14} className="mr-1.5" />
                {author.experience}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                <Icon name="Users" size={14} className="mr-1.5" />
                {author.mentored}
              </span>
            </div>
          )}

          {/* Bio */}
          {showBio && (
            <p className="text-text-secondary mb-4 leading-relaxed">
              {author.bio}
            </p>
          )}

          {/* Social Links */}
          {showSocial && (
            <div className="flex items-center space-x-4">
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Icon name="Linkedin" size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
                aria-label="View GitHub profile"
              >
                <Icon name="Github" size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
                aria-label="Follow on Twitter"
              >
                <Icon name="Twitter" size={18} />
                <span className="hidden sm:inline">Twitter</span>
              </a>
              <a
                href="/about"
                className="flex items-center space-x-2 text-sm font-medium text-accent hover:text-orange-600 transition-colors"
              >
                <span>View Full Profile</span>
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
