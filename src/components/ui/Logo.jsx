import React from 'react';

// Logo component that switches between two images depending on the
// user system theme using the prefers-color-scheme media query.
// First source (dark) is used when the user prefers dark mode.
// Second source (light) is used when the user prefers light mode.
export default function Logo({ className = 'h-10 w-auto', alt = 'CoreX Logo' }) {
  return (
    <picture>
      {/* light-mode logo (default - no media query needed) */}
      <source srcSet="/icons/official-logo-core-x.svg" />
      {/* dark-mode logo (only used when dark mode is explicitly preferred) */}
      <source srcSet="/icons/official-logo-core-x-footer.svg" media="(prefers-color-scheme: dark)" />
      {/* fallback img (light version) */}
      <img src="/icons/official-logo-core-x.svg" alt={alt} className={className} />
    </picture>
  );
}
