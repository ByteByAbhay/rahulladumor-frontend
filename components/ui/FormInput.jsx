import React from 'react';
import Icon from 'components/AppIcon';

const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  ...props
}) => {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-accent focus:border-accent ${
            error 
              ? 'border-error focus:ring-red-500 focus:border-error' 
              : 'border-border'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Icon name="AlertCircle" size={20} color="#E53E3E" />
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={16} color="#E53E3E" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormInput;