import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import { ReduxProvider } from '../providers/ReduxProvider'
import Head from 'next/head'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
})

// Google Analytics page view tracking
const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }

    // Track page views on route change
    router.events.on('routeChangeComplete', handleRouteChange)

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Rahul Ladumor - AWS Cloud Consulting & Mentorship</title>
        <meta name="description" content="Professional AWS cloud consulting and mentorship services. Expert guidance for cloud architecture, migration, and optimization." />
        <meta name="keywords" content="AWS, cloud consulting, mentorship, cloud architecture, migration, optimization" />
        <meta name="author" content="Rahul Ladumor" />
        <meta name="creator" content="Rahul Ladumor" />
        <meta name="publisher" content="Rahul Ladumor" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="Rahul Ladumor - AWS Cloud Consulting & Mentorship" />
        <meta property="og:description" content="Professional AWS cloud consulting and mentorship services. Expert guidance for cloud architecture, migration, and optimization." />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'} />
        <meta property="og:site_name" content="Rahul Ladumor Professional" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rahul Ladumor - AWS Cloud Consulting & Mentorship" />
        <meta name="twitter:description" content="Professional AWS cloud consulting and mentorship services. Expert guidance for cloud architecture, migration, and optimization." />
        <meta name="twitter:creator" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@rahulladumor'} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <div className="antialiased">
          <ReduxProvider>
            <Component {...pageProps} />
          </ReduxProvider>
        </div>
      </div>
    </>
  )
}
