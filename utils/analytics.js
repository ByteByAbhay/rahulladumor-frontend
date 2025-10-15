// Google Analytics 4 implementation

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  }

  init() {
    if (!this.trackingId || this.isInitialized) return;

    // Load Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", this.trackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isInitialized) return;

    window.gtag("config", this.trackingId, {
      page_path: path,
      page_title: title,
    });
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) return;

    window.gtag("event", eventName, {
      event_category: parameters.category || "engagement",
      event_label: parameters.label,
      value: parameters.value,
      ...parameters,
    });
  }

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    this.trackEvent("form_submit", {
      category: "form",
      label: formName,
      success: success,
    });
  }

  // Track CTA clicks
  trackCTAClick(ctaName, location) {
    this.trackEvent("cta_click", {
      category: "cta",
      label: ctaName,
      location: location,
    });
  }

  // Track scroll depth
  trackScrollDepth(percentage) {
    this.trackEvent("scroll", {
      category: "engagement",
      label: `${percentage}%`,
      value: percentage,
    });
  }

  // Track booking attempts
  trackBookingAttempt(step, success = false) {
    this.trackEvent("booking_attempt", {
      category: "conversion",
      label: `step_${step}`,
      success: success,
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Auto-initialize in production
if (process.env.NODE_ENV === 'production') {
  analytics.init();
}

export default analytics;
