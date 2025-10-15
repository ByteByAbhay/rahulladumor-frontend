import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { useRouter } from "next/navigation";

const FloatingBookingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling 50% of the page, hide when near booking section
      const showThreshold = windowHeight * 0.5;
      const hideThreshold = documentHeight - windowHeight * 2;

      setIsVisible(
        scrollPosition > showThreshold && scrollPosition < hideThreshold
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookingClick = () => {
    router.push("/booking");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "w-80" : "w-16"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <button
          onClick={handleBookingClick}
          className="w-full bg-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cta-shadow flex items-center justify-center p-4 group"
        >
          <Icon name="Calendar" size={24} className="flex-shrink-0" />

          {isExpanded && (
            <div className="ml-3 text-left overflow-hidden">
              <div className="font-semibold text-sm whitespace-nowrap">
                Book Free Discovery Call
              </div>
              <div className="text-xs opacity-90 whitespace-nowrap">
                30 min • No commitment
              </div>
            </div>
          )}
        </button>

        {isExpanded && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-border p-3 text-xs">
            <div className="flex items-center space-x-2 text-green-600 mb-1">
              <Icon name="Clock" size={12} />
              <span className="font-medium">3 slots left this week</span>
            </div>
            <div className="text-text-secondary">
              Free AWS cost analysis included
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingBookingCTA;
