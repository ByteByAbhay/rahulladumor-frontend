import Head from "next/head";
import StructuredData from "./StructuredData";
import AuthorSchema from "./AuthorSchema";

function MetaHead({
  seo,
  titleOverride,
  titleSuffix = "",
  article = null,
  breadcrumbs = null,
  includeStructuredData = true,
  structuredDataType = "all",
  includeAuthorSchema = true, // New prop for E-E-A-T
}) {
  const s = seo || {};
  
  // Default fallback title if none provided
  const defaultTitle = "Rahul Ladumor | AWS Expert & Cost Reduction Specialist";
  const fullTitle =
    titleOverride || (s.title ? `${s.title}${titleSuffix}` : defaultTitle);
  
  const desc = s.description || "4x AWS Community Builder specializing in serverless architecture and cloud cost optimization. Helping startups and enterprises reduce AWS costs by 60% while scaling securely.";
  const keywords = Array.isArray(s.keywords)
    ? s.keywords.join(", ")
    : s.keywords || "AWS Expert, Cloud Consulting, Cost Optimization, Serverless Architecture, AWS Community Builder";
  const canonical = s.canonicalUrl || "https://www.rahulladumor.in";
  const og = s.openGraph || {};
  const twitter = s.twitter || {};
  const structured = s.structuredData;
  const robots =
    s.robots ||
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Default OG image if not provided
  const defaultOgImage = {
    url: "https://www.rahulladumor.in/assets/images/profile.avif",
    width: "1200",
    height: "630",
    alt: "Rahul Ladumor - AWS Solutions Architect & Cloud Expert",
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
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
      <meta
        property="og:site_name"
        content="Rahul Ladumor - AWS Solutions Architect"
      />
      <meta property="og:title" content={og.title || fullTitle} />
      <meta property="og:description" content={og.description || desc} />
      <meta property="og:url" content={og.url || canonical} />
      <meta
        property="og:type"
        content={article ? "article" : og.type || "website"}
      />

      {/* Article-specific Open Graph tags */}
      {article && (
        <>
          <meta
            property="article:published_time"
            content={article.publishedTime}
          />
          <meta
            property="article:modified_time"
            content={article.modifiedTime || article.publishedTime}
          />
          <meta
            property="article:author"
            content={article.author || "Rahul Ladumor"}
          />
          <meta
            property="article:section"
            content={article.section || "Technology"}
          />
          {article.tags &&
            article.tags.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {/* Open Graph Images */}
      {Array.isArray(og.images) && og.images[0] ? (
        <>
          <meta property="og:image" content={og.images[0].url} />
          <meta property="og:image:secure_url" content={og.images[0].url} />
          <meta
            property="og:image:width"
            content={og.images[0].width || "1200"}
          />
          <meta
            property="og:image:height"
            content={og.images[0].height || "630"}
          />
          <meta
            property="og:image:alt"
            content={og.images[0].alt || fullTitle}
          />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      ) : (
        <>
          <meta property="og:image" content={defaultOgImage.url} />
          <meta property="og:image:secure_url" content={defaultOgImage.url} />
          <meta property="og:image:width" content={defaultOgImage.width} />
          <meta property="og:image:height" content={defaultOgImage.height} />
          <meta property="og:image:alt" content={defaultOgImage.alt} />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta
        name="twitter:card"
        content={twitter.cardType || "summary_large_image"}
      />
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
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="format-detection" content="telephone=no" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s.additionalStructuredData),
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: crumb.url,
              })),
            }),
          }}
        />
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="color-scheme" content="light dark" />
      <meta name="creator" content="Rahul Ladumor" />
      <meta name="publisher" content="Rahul Ladumor" />

      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Rahul Ladumor" />

      {/* Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

      {/* Verification Tags (add your verification codes) */}
      {s.googleVerification && (
        <meta name="google-site-verification" content={s.googleVerification} />
      )}
      {s.bingVerification && (
        <meta name="msvalidate.01" content={s.bingVerification} />
      )}
      {s.pinterestVerification && (
        <meta name="p:domain_verify" content={s.pinterestVerification} />
      )}

      {/* Structured Data / Schema Markup */}
      {includeStructuredData && (
        <StructuredData
          type={structuredDataType}
          pageData={{
            url: canonical,
            title: fullTitle,
            description: desc,
            breadcrumbs: breadcrumbs,
          }}
        />
      )}

      {/* Author Schema for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) */}
      {includeAuthorSchema && (
        <AuthorSchema 
          type={article ? "article" : "person"}
          articleData={article}
        />
      )}
    </Head>
  );
}

export default MetaHead;
