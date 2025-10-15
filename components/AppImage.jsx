import React, { useState } from 'react';
import NextImage from 'next/image';

function Image({
  src,
  alt = "Image",
  className = "",
  width,
  height,
  fill,
  priority = false,
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // If external URL or has error, use regular img tag
  const isExternal = src?.startsWith('http') || src?.startsWith('//');
  
  if (hasError || isExternal) {
    return (
      <img
        src={hasError ? "/assets/images/no_image.png" : src}
        alt={alt}
        className={className}
        onError={handleError}
        {...props}
      />
    );
  }

  // Use Next.js Image for internal images
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      onError={handleError}
      {...props}
    />
  );
}

export default Image;
