"use client";

// Wrapper around next-cloudinary that gracefully degrades when env vars are missing
import React from 'react';

import { CldImage as RealCldImage, CldVideoPlayer as RealCldVideoPlayer } from 'next-cloudinary';
const hasCloudName = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function Placeholder({ className, style, alt = 'media placeholder', fill, width, height, type = 'image' }) {
  const baseStyle = {
    background: type === 'video' ? 'linear-gradient(135deg,#111827,#374151)' : 'linear-gradient(135deg,#f3f4f6,#e5e7eb)',
    color: type === 'video' ? '#d1d5db' : '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    borderRadius: 8,
    ...(fill ? { position: 'absolute', inset: 0 } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };
  return (
    <div className={className} style={baseStyle} aria-label={alt} role="img">
      {type === 'video' ? 'Video preview unavailable' : 'Image preview unavailable'}
    </div>
  );
}

export function CldImage(props) {
  if (!hasCloudName) {
    const { className, style, alt, fill, width, height } = props;
    return (
      <Placeholder
        className={className}
        style={style}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        type="image"
      />
    );
  }
  return <RealCldImage {...props} />;
}

export function CldVideoPlayer(props) {
  if (!hasCloudName) {
    const { className, style, fill, width, height } = props;
    return (
      <Placeholder
        className={className}
        style={style}
        alt="Cloudinary video placeholder"
        fill={fill}
        width={width}
        height={height}
        type="video"
      />
    );
  }
  return <RealCldVideoPlayer {...props} />;
}
