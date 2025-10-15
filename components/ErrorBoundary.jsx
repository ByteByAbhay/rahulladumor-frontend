import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo
    });

    // Report to error tracking service (if configured)
    if (window.__COMPONENT_ERROR__) {
      window.__COMPONENT_ERROR__(error, errorInfo);
    }

    // Log to console in development
    if (process.env.DEV) {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    const errorReport = {
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Copy error details to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => alert('Error details copied to clipboard'))
      .catch(() => console.error('Failed to copy error details'));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-4">
          <div className="text-center p-8 max-w-lg bg-white rounded-lg shadow-lg border border-border">
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={32} color="#E53E3E" />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className="text-2xl font-bold text-primary">
                Oops! Something went wrong
              </h1>
              <p className="text-text-secondary">
                We encountered an unexpected error. Don't worry, this has been reported
                and we're working to fix it.
              </p>

              {process.env.DEV && this.state.error && (
                <details className="text-left bg-red-50 p-4 rounded border border-red-200 mt-4">
                  <summary className="cursor-pointer font-medium text-red-800 mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                aria-label="Retry loading the page"
                className="bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Icon name="RotateCcw" size={18} />
                <span>Try Again</span>
              </button>

              <button
                onClick={() => window.location.href = "/"}
                aria-label="Go to homepage"
                className="border-2 border-primary text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Icon name="Home" size={18} />
                <span>Go Home</span>
              </button>

              {process.env.DEV && (
                <button
                  onClick={this.handleReportError}
                  aria-label="Copy error details for reporting"
                  className="border border-gray-300 text-gray-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="Copy" size={16} />
                  <span>Copy Error</span>
                </button>
              )}
            </div>

            <p className="text-xs text-text-secondary mt-6">
              If this problem persists, please contact support with the error details.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;