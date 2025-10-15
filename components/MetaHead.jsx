import Head from 'next/head'

function MetaHead({ seo, titleOverride, titleSuffix = '' }) {
  const s = seo || {}
  const fullTitle = titleOverride || (s.title ? `${s.title}${titleSuffix}` : undefined)
  const desc = s.description || ''
  const keywords = Array.isArray(s.keywords) ? s.keywords.join(', ') : s.keywords
  const canonical = s.canonicalUrl
  const og = s.openGraph || {}
  const twitter = s.twitter || {}
  const structured = s.structuredData
  const robots = s.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <Head>
      {/* Basic Meta Tags */}
      {fullTitle && <title>{fullTitle}</title>}
      {desc && <meta name="description" content={desc} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content={s.author || "Rahul Ladumor"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Geo Tags */}
      {s.geo && (
        <>
          <meta name="geo.region" content={s.geo.region} />
          <meta name="geo.placename" content={s.geo.placename} />
          <meta name="geo.position" content={s.geo.position} />
          <meta name="ICBM" content={s.geo.position} />
        </>
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Rahul Ladumor - AWS Solutions Architect" />
      {og.title || fullTitle ? (
        <meta property="og:title" content={og.title || fullTitle} />
      ) : null}
      {og.description || desc ? (
        <meta property="og:description" content={og.description || desc} />
      ) : null}
      {og.url || canonical ? (
        <meta property="og:url" content={og.url || canonical} />
      ) : null}
      <meta property="og:type" content={og.type || 'website'} />
      {Array.isArray(og.images) && og.images[0] ? (
        <>
          <meta property="og:image" content={og.images[0].url} />
          <meta property="og:image:secure_url" content={og.images[0].url} />
          <meta property="og:image:width" content={og.images[0].width || '1200'} />
          <meta property="og:image:height" content={og.images[0].height || '630'} />
          <meta property="og:image:alt" content={og.images[0].alt || fullTitle} />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      ) : null}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitter.cardType || 'summary_large_image'} />
      {twitter.handle && (
        <>
          <meta name="twitter:creator" content={twitter.handle} />
          <meta name="twitter:site" content={twitter.handle} />
        </>
      )}
      {fullTitle && <meta name="twitter:title" content={fullTitle} />}
      {desc && <meta name="twitter:description" content={desc} />}
      {Array.isArray(og.images) && og.images[0]?.url && (
        <meta name="twitter:image" content={og.images[0].url} />
      )}

      {/* LinkedIn Meta Tags */}
      {fullTitle && <meta property="linkedin:title" content={fullTitle} />}
      {desc && <meta property="linkedin:description" content={desc} />}
      {Array.isArray(og.images) && og.images[0]?.url && (
        <meta property="linkedin:image" content={og.images[0].url} />
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1B365D" />
      <meta name="msapplication-TileColor" content="#1B365D" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//linkedin.com" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//twitter.com" />
      <link rel="dns-prefetch" href="//calendly.com" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structured ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
        />
      ) : null}

      {/* Additional Structured Data for Professional Services */}
      {s.additionalStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s.additionalStructuredData) }}
        />
      )}
    </Head>
  )
}

export default MetaHead

