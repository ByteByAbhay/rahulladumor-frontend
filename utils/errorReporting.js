// Error reporting and logging utilities

class ErrorReporter {
  constructor() {
    this.isProduction = process.env.PROD;
    this.apiEndpoint = process.env.VITE_ERROR_REPORTING_ENDPOINT;
  }

  // Report JavaScript errors
  reportError(error, errorInfo = {}) {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      ...errorInfo,
    };

    // Log to console in development
    if (!this.isProduction) {
      console.error("Error Report:", errorReport);
      return;
    }

    // Send to error reporting service in production
    this.sendErrorReport(errorReport);
  }

  // Report API errors
  reportAPIError(endpoint, status, response, requestData = {}) {
    const apiError = {
      type: "api_error",
      endpoint,
      status,
      response,
      requestData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    this.reportError(new Error(`API Error: ${endpoint} - ${status}`), apiError);
  }

  // Report performance issues
  reportPerformanceIssue(metric, value, threshold) {
    if (value <= threshold) return;

    const performanceIssue = {
      type: "performance_issue",
      metric,
      value,
      threshold,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    this.reportError(
      new Error(`Performance Issue: ${metric}`),
      performanceIssue
    );
  }

  // Send error report to external service
  async sendErrorReport(errorReport) {
    if (!this.apiEndpoint) return;

    try {
      await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorReport),
      });
    } catch (err) {
      console.error("Failed to send error report:", err);
    }
  }

  // Get user ID from localStorage or generate one
  getUserId() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", userId);
    }
    return userId;
  }

  // Get session ID from sessionStorage or generate one
  getSessionId() {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = "session_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }
}

// Create singleton instance
const errorReporter = new ErrorReporter();

// Global error handlers
window.addEventListener("error", (event) => {
  errorReporter.reportError(event.error, {
    type: "javascript_error",
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  errorReporter.reportError(new Error(event.reason), {
    type: "unhandled_promise_rejection",
  });
});

export default errorReporter;
