import { useEffect } from "react";
import analytics from "../utils/analytics";

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        analytics.trackEvent("web_vital_lcp", {
          category: "performance",
          value: Math.round(lastEntry.startTime),
        });
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          analytics.trackEvent("web_vital_fid", {
            category: "performance",
            value: Math.round(entry.processingStart - entry.startTime),
          });
        });
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        analytics.trackEvent("web_vital_cls", {
          category: "performance",
          value: Math.round(clsValue * 1000),
        });
      }).observe({ entryTypes: ["layout-shift"] });
    };

    // Track page load time
    const trackPageLoad = () => {
      window.addEventListener("load", () => {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        analytics.trackEvent("page_load_time", {
          category: "performance",
          value: loadTime,
        });
      });
    };

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScroll = 0;
      const thresholds = [25, 50, 75, 90, 100];
      let trackedThresholds = new Set();

      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100
        );

        maxScroll = Math.max(maxScroll, scrollPercent);

        thresholds.forEach((threshold) => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            analytics.trackScrollDepth(threshold);
          }
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => window.removeEventListener("scroll", handleScroll);
    };

    // Initialize tracking
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      trackWebVitals();
      trackPageLoad();
      const cleanupScroll = trackScrollDepth();

      return cleanupScroll;
    }
  }, []);
};

export default usePerformanceMonitoring;
