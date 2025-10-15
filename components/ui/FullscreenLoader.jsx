import React from 'react';

const FullscreenLoader = () => {
  // Get personal info from environment variables
  const personName = process.env.NEXT_PUBLIC_PERSON_NAME || 'Rahul Ladumor';
  const personTitle = process.env.NEXT_PUBLIC_PERSON_TITLE || '3x AWS Certified Full-Stack JavaScript & Cloud Engineer';
  const personLocation = process.env.NEXT_PUBLIC_PERSON_LOCATION || 'Surat, Gujarat, India';
  const experienceYears = process.env.NEXT_PUBLIC_PERSON_EXPERIENCE_YEARS || '8+';
  const totalProjects = process.env.NEXT_PUBLIC_PERSON_PROJECTS || '50+';
  const certifications = process.env.NEXT_PUBLIC_PERSON_CERTIFICATIONS || '3+';
  const availabilityTypes = process.env.NEXT_PUBLIC_PERSON_AVAILABILITY_TYPES || 'full-time,contract,consulting';

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      {/* Main Loading Content */}
      <div className="relative flex flex-col items-center justify-center space-y-8 max-w-md mx-auto px-6">
        
        {/* Logo/Brand Area */}
        <div className="relative">
          {/* Animated Circle */}
          <div className="w-24 h-24 border-4 border-border rounded-full relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-transparent border-t-primary rounded-full animate-spin-reverse" style={{ animationDuration: '1.5s' }}></div>
          </div>
          
          {/* Center Icon - AWS Logo representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <div className="text-accent text-lg font-bold">☁</div>
            </div>
          </div>
        </div>

        {/* Personal Branding */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">
              {personName}
            </h1>
            <p className="text-accent font-semibold text-sm">
              {personTitle}
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary animate-pulse">
              Fetching more details...
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Preparing {experienceYears} years of AWS expertise and {totalProjects} successful projects...
            </p>
          </div>
        </div>

        {/* Key Metrics Preview */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="text-center p-3 bg-surface rounded-lg border border-border">
            <div className="text-accent font-bold text-lg animate-pulse">
              {experienceYears}
            </div>
            <div className="text-text-secondary text-xs">
              Years Experience
            </div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg border border-border">
            <div className="text-primary font-bold text-lg animate-pulse">
              {certifications}
            </div>
            <div className="text-text-secondary text-xs">
              AWS Certifications
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Loading Progress */}
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Loading Portfolio</span>
            <span className="animate-pulse">Please wait...</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-primary animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Location & Availability */}
        <div className="text-center text-xs text-text-secondary space-y-1">
          <p>📍 {personLocation}</p>
          <p className="text-success">✅ Available for {availabilityTypes.replace(/,/g, ', ')}</p>
        </div>
      </div>

      {/* Floating AWS Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Additional floating elements for AWS theme */}
      <div className="absolute top-1/3 right-1/3 text-accent/20 text-xs animate-pulse" style={{ animationDelay: '1.5s' }}>λ</div>
      <div className="absolute bottom-1/3 left-1/4 text-primary/20 text-xs animate-pulse" style={{ animationDelay: '2.5s' }}>☁</div>
    </div>
  );
};

export default FullscreenLoader;
