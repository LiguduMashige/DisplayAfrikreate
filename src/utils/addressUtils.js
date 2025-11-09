/**
 * Address utility functions for privacy protection
 */

/**
 * Extract city and province from full address
 * Hides street-level details for user privacy
 */
export const formatAddressForDisplay = (fullAddress) => {
  if (!fullAddress) return 'Location not specified';
  
  // Split by comma
  const parts = fullAddress.split(',').map(part => part.trim());
  
  // For South African addresses: Street, Suburb, City, PostalCode, Country
  // We want: Suburb, City, Country or City, Country
  if (parts.length >= 3) {
    const country = parts[parts.length - 1]; // "South Africa"
    const city = parts[parts.length - 3]; // "Pretoria" or "Cape Town"
    const suburb = parts[parts.length - 4]; // "Hatfield" or "Gardens"
    
    if (suburb && city && country) {
      return `${suburb}, ${city}, ${country}`;
    } else if (city && country) {
      return `${city}, ${country}`;
    }
  }
  
  // Fallback: show last 2 parts (City, Country)
  if (parts.length >= 2) {
    return parts.slice(-2).join(', ');
  }
  
  return fullAddress;
};

/**
 * Get coordinates from address (for map display)
 * This keeps the exact location for map purposes
 */
export const getCoordinatesFromAddress = (address) => {
  // This would normally call a geocoding API
  // For now, return mock coordinates based on city
  const cityCoordinates = {
    'Pretoria': { lat: -25.7479, lng: 28.2293 },
    'Cape Town': { lat: -33.9249, lng: 18.4241 },
    'Johannesburg': { lat: -26.2041, lng: 28.0473 },
    'Durban': { lat: -29.8587, lng: 31.0218 },
    'Port Elizabeth': { lat: -33.9608, lng: 25.6022 },
    'East London': { lat: -33.0292, lng: 27.9119 }
  };
  
  for (const [city, coords] of Object.entries(cityCoordinates)) {
    if (address.includes(city)) {
      return coords;
    }
  }
  
  // Default to Johannesburg if city not found
  return { lat: -26.2041, lng: 28.0473 };
};

/**
 * Check if user has permission to view full address
 * (e.g., kreative viewing their own profile, or after connection)
 */
export const canViewFullAddress = (viewerId, kreativeId, isConnected = false) => {
  return viewerId === kreativeId || isConnected;
};

/**
 * Format address based on viewer permissions
 */
export const getDisplayAddress = (fullAddress, viewerId, kreativeId, isConnected = false) => {
  if (canViewFullAddress(viewerId, kreativeId, isConnected)) {
    return fullAddress;
  }
  return formatAddressForDisplay(fullAddress);
};
