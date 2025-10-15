import React from 'react';
import Icon from './AppIcon';
import { personalInfo } from 'config/personalInfo';

const DevelopmentWarning = () => {
  // Check if placeholder content is still being used
  const hasPlaceholders =
    personalInfo.name.includes('[') ||
    personalInfo.email.includes('your.email') ||
    personalInfo.social.linkedin.includes('your-username') ||
    personalInfo.title.includes('[');

  // Only show in development or if placeholders are detected
  if (!hasPlaceholders && process.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="AlertTriangle" size={24} color="white" />
          <div>
            <h3 className="font-bold">⚠️ DEVELOPMENT MODE - NOT READY FOR PUBLIC USE</h3>
            <p className="text-sm opacity-90">
              This portfolio contains placeholder content. Complete the authenticity checklist before going live.
            </p>
          </div>
        </div>
        <div className="text-sm">
          <p>Check: AUTHENTICITY_CHECKLIST.md</p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentWarning;