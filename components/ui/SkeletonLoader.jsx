import React from 'react';

const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'text' 
}) => {
  const variants = {
    text: 'rounded',
    avatar: 'rounded-full',
    card: 'rounded-lg',
    button: 'rounded-lg'
  };

  return (
    <div 
      className={`bg-gray-200 animate-pulse ${width} ${height} ${variants[variant]} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

// Skeleton components for common patterns
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader 
        key={index}
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
        className="h-4"
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-6 border border-gray-200 rounded-lg ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <SkeletonLoader variant="avatar" width="w-12" height="h-12" />
      <div className="space-y-2 flex-1">
        <SkeletonLoader width="w-1/2" height="h-4" />
        <SkeletonLoader width="w-1/3" height="h-3" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export default SkeletonLoader;