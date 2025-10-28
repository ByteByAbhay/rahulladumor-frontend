// Google Analytics utility functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

// Track page views
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  event({
    action: "click",
    category: "Button",
    label: `${buttonName} - ${location}`,
  });
};

// Track form submissions
export const trackFormSubmit = (formName) => {
  event({
    action: "submit",
    category: "Form",
    label: formName,
  });
};

// Track link clicks
export const trackLinkClick = (linkName, destination) => {
  event({
    action: "click",
    category: "Link",
    label: `${linkName} - ${destination}`,
  });
};

// Track downloads
export const trackDownload = (fileName) => {
  event({
    action: "download",
    category: "File",
    label: fileName,
  });
};

// Track video plays
export const trackVideoPlay = (videoName) => {
  event({
    action: "play",
    category: "Video",
    label: videoName,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  event({
    action: "scroll",
    category: "Engagement",
    label: `${percentage}%`,
    value: percentage,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName, section) => {
  event({
    action: "click",
    category: "CTA",
    label: `${ctaName} - ${section}`,
  });
};

// Track booking/consultation requests
export const trackBookingRequest = (serviceType) => {
  event({
    action: "request",
    category: "Booking",
    label: serviceType,
  });
};

// Track contact form
export const trackContactForm = (subject) => {
  event({
    action: "submit",
    category: "Contact",
    label: subject,
  });
};
