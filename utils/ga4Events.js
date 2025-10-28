/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * This file contains helper functions to track custom events in GA4.
 * Events are automatically sent to GA4 and can be marked as conversions.
 */

/**
 * Track a custom GA4 event
 * @param {string} eventName - Name of the event (e.g., 'consultation_booked')
 * @param {object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`[GA4] Event tracked: ${eventName}`, eventParams);
  } else {
    console.warn('[GA4] gtag not available. Event not tracked:', eventName);
  }
};

/**
 * Track consultation booking event
 * This should be marked as a conversion in GA4
 */
export const trackConsultationBooked = (source = 'unknown') => {
  trackEvent('consultation_booked', {
    event_category: 'Consultation',
    event_label: 'Book Consultation Button',
    source: source, // e.g., 'booking_page', 'hero_section', 'floating_cta'
    value: 1,
  });
};

/**
 * Track contact form submission
 * This should be marked as a conversion in GA4
 */
export const trackContactFormSubmit = (formType = 'general') => {
  trackEvent('contact_form_submit', {
    event_category: 'Lead',
    event_label: 'Contact Form',
    form_type: formType, // e.g., 'general', 'consultation', 'quote'
    value: 1,
  });
};

/**
 * Track discovery call booking (Calendly)
 * This should be marked as a conversion in GA4
 */
export const trackDiscoveryCallBooked = (source = 'unknown') => {
  trackEvent('discovery_call_booked', {
    event_category: 'Consultation',
    event_label: 'Discovery Call Scheduled',
    source: source,
    value: 1,
  });
};

/**
 * Track service inquiry
 */
export const trackServiceInquiry = (serviceName) => {
  trackEvent('service_inquiry', {
    event_category: 'Engagement',
    event_label: 'Service Interest',
    service_name: serviceName,
    value: 1,
  });
};

/**
 * Track email click
 */
export const trackEmailClick = (location = 'unknown') => {
  trackEvent('email_click', {
    event_category: 'Contact',
    event_label: 'Email Link Clicked',
    location: location,
  });
};

/**
 * Track phone click
 */
export const trackPhoneClick = (location = 'unknown') => {
  trackEvent('phone_click', {
    event_category: 'Contact',
    event_label: 'Phone Link Clicked',
    location: location,
  });
};

/**
 * Track social media click
 */
export const trackSocialClick = (platform, location = 'unknown') => {
  trackEvent('social_click', {
    event_category: 'Social',
    event_label: `${platform} Link Clicked`,
    platform: platform,
    location: location,
  });
};

/**
 * Track blog post view
 */
export const trackBlogView = (blogTitle, blogId) => {
  trackEvent('blog_view', {
    event_category: 'Content',
    event_label: 'Blog Post Viewed',
    blog_title: blogTitle,
    blog_id: blogId,
  });
};

/**
 * Track CTA button click
 */
export const trackCTAClick = (ctaText, location = 'unknown') => {
  trackEvent('cta_click', {
    event_category: 'Engagement',
    event_label: 'CTA Button Clicked',
    cta_text: ctaText,
    location: location,
  });
};

/**
 * Track file download
 */
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    event_category: 'Download',
    event_label: 'File Downloaded',
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundClick = (url, linkText) => {
  trackEvent('outbound_click', {
    event_category: 'Outbound',
    event_label: 'External Link Clicked',
    url: url,
    link_text: linkText,
  });
};

/**
 * Track video play
 */
export const trackVideoPlay = (videoTitle, videoId) => {
  trackEvent('video_play', {
    event_category: 'Video',
    event_label: 'Video Started',
    video_title: videoTitle,
    video_id: videoId,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage, page) => {
  trackEvent('scroll_depth', {
    event_category: 'Engagement',
    event_label: `Scrolled ${percentage}%`,
    percentage: percentage,
    page: page,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds, page) => {
  trackEvent('time_on_page', {
    event_category: 'Engagement',
    event_label: 'Time Spent',
    seconds: seconds,
    page: page,
  });
};

// Export all tracking functions
export default {
  trackEvent,
  trackConsultationBooked,
  trackContactFormSubmit,
  trackDiscoveryCallBooked,
  trackServiceInquiry,
  trackEmailClick,
  trackPhoneClick,
  trackSocialClick,
  trackBlogView,
  trackCTAClick,
  trackDownload,
  trackOutboundClick,
  trackVideoPlay,
  trackScrollDepth,
  trackTimeOnPage,
};
