// Fallback image URLs by category
export const categoryFallbacks = {
  'fine artist': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  'digital artist': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800',
  'photographer': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
  'animator': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
  'designer': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'musician': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
  'default': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
};

// Handle image loading error
export const handleImageError = (e, category = 'default') => {
  if (e.target.dataset.fallbackAttempted) {
    // Already tried fallback, use colored placeholder
    e.target.src = generatePlaceholder(category);
  } else {
    // Try category-specific fallback
    e.target.dataset.fallbackAttempted = 'true';
    e.target.src = categoryFallbacks[category?.toLowerCase()] || categoryFallbacks.default;
  }
};

// Generate colored placeholder
export const generatePlaceholder = (category) => {
  const colors = {
    'fine artist': '#ec4899',
    'digital artist': '#8b5cf6',
    'photographer': '#3b82f6',
    'animator': '#10b981',
    'designer': '#f59e0b',
    'musician': '#ef4444',
    'default': '#6b7280'
  };
  
  const color = colors[category?.toLowerCase()] || colors.default;
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-family="Arial">
        ${category || 'Artwork'}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Preload image with fallback
export const loadImageWithFallback = (src, category) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      const fallback = categoryFallbacks[category?.toLowerCase()] || categoryFallbacks.default;
      resolve(fallback);
    };
    img.src = src;
  });
};

// Get optimized image URL (add query params for resizing)
export const getOptimizedImageUrl = (url, width = 800) => {
  if (!url) return null;
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=80`;
  }
  return url;
};
