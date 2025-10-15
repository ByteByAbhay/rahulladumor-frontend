// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateCompany = (company) => {
  return company && company.trim().length >= 2;
};

export const validateBookingForm = (formData, currentStep) => {
  const errors = {};

  switch (currentStep) {
    case 1:
      if (!validateName(formData.name)) {
        errors.name = 'Please enter your full name (at least 2 characters)';
      }
      if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!validateCompany(formData.company)) {
        errors.company = 'Please enter your company name (at least 2 characters)';
      }
      break;

    case 2:
      if (!formData.awsSpend) {
        errors.awsSpend = 'Please select your AWS spending range';
      }
      if (!formData.primaryChallenge) {
        errors.primaryChallenge = 'Please select your primary challenge';
      }
      break;

    case 3:
      if (!formData.timeline) {
        errors.timeline = 'Please select your timeline';
      }
      break;

    default:
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};