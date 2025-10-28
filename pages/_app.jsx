import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { ReduxProvider } from "../providers/ReduxProvider";
// import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Arial",
    "sans-serif",
  ],
});

// Google Analytics page view tracking
const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    // Track page views on route change
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className={inter.className}>
        <div className="antialiased">
          <ReduxProvider>
            <Component {...pageProps} />
          </ReduxProvider>
        </div>
      </div>
    </>
  );
}
