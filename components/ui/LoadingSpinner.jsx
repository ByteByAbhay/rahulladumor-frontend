import React from 'react';
import Icon from 'components/AppIcon';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'accent', 
  text = '', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const colorClasses = {
    accent: 'text-accent',
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Icon 
        name="Loader" 
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {text && (
        <span className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;