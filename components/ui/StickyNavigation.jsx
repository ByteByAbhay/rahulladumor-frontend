import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { useRouter, usePathname } from "next/navigation";

const StickyNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isNotScrolled, setIsNotScrolled] = useState(false);

  console.log(pathname);
  const navigationItems = [
    { path: "/", label: "Home", icon: "Home" },
    { path: "/services", label: "Services", icon: "Settings" },
    { path: "/reviews", label: "Reviews", icon: "Star" },
    { path: "/about", label: "About", icon: "User" },
    {
      path: "/booking",
      label: "Book Call",
      icon: "Calendar",
      minWidth: "119px",
    },
    { path: "/contact", label: "Contact", icon: "Mail" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") {
        const scrollPosition = window.scrollY;
        setIsNotScrolled(scrollPosition < 100);
      }
    };

    if (pathname === "/") {
      setIsNotScrolled(false);
    } else {
      setIsNotScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav
      className={`fixed z-50 backdrop-blur-sm shadow-lg px-2 py-2
     ${
       isNotScrolled
         ? "bg-primary w-full"
         : "bg-white/90 left-1/2 transform -translate-x-1/2 top-4 rounded-full border border-border"
     }`}
    >
      <div className="flex items-center space-x-1 justify-center">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            aria-label={`Navigate to ${item.label}`}
            aria-current={pathname === item.path ? "page" : undefined}
            className={`
              ${
                item.minWidth ? `min-w-[${item.minWidth}]` : ""
              } flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              pathname === item.path
                ? "bg-accent text-white"
                : `${
                    isNotScrolled ? "text-white" : "text-text-secondary"
                  } hover:text-primary hover:bg-surface `
            }
            `}
          >
            <Icon name={item.icon} size={16} />
            <span className="hidden md:inline text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default StickyNavigation;
