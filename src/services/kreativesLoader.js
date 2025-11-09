/**
 * Kreatives Loader Service
 * Dynamically loads artist data and fetches NFT artworks from blockchain
 */

import kreativesData from '../data/kreatives.json';
import { fetchArtworksByCategory, batchFetchArtworks } from './nftService';

/**
 * Load all kreatives with NFT artworks from blockchain
 */
export const loadKreativesWithArtworks = async () => {
  try {
    console.log('Loading kreatives with NFT artworks...');
    
    // Batch fetch artworks for all artists
    const kreativesWithArtworks = await batchFetchArtworks(kreativesData);
    
    console.log(`Successfully loaded ${kreativesWithArtworks.length} kreatives with artworks`);
    return kreativesWithArtworks;
    
  } catch (error) {
    console.error('Error loading kreatives with artworks:', error);
    // Return base data without artworks if fetch fails
    return kreativesData;
  }
};

/**
 * Load kreatives by category with NFT artworks
 */
export const loadKreativesByCategory = async (category) => {
  try {
    const filteredKreatives = kreativesData.filter(
      k => k.category.toLowerCase() === category.toLowerCase()
    );
    
    const withArtworks = await batchFetchArtworks(filteredKreatives);
    return withArtworks;
    
  } catch (error) {
    console.error(`Error loading ${category} kreatives:`, error);
    return kreativesData.filter(
      k => k.category.toLowerCase() === category.toLowerCase()
    );
  }
};

/**
 * Get kreatives statistics
 */
export const getKreativesStats = () => {
  const categories = [...new Set(kreativesData.map(k => k.category))];
  const stats = {
    total: kreativesData.length,
    categories: categories.length,
    byCategory: {}
  };
  
  categories.forEach(category => {
    stats.byCategory[category] = kreativesData.filter(
      k => k.category === category
    ).length;
  });
  
  return stats;
};

/**
 * Search kreatives by name or description
 */
export const searchKreatives = (query, kreatives = kreativesData) => {
  const lowerQuery = query.toLowerCase();
  return kreatives.filter(k => 
    k.name.toLowerCase().includes(lowerQuery) ||
    k.description.toLowerCase().includes(lowerQuery) ||
    k.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get random featured kreatives
 */
export const getFeaturedKreatives = async (count = 10) => {
  const shuffled = [...kreativesData].sort(() => 0.5 - Math.random());
  const featured = shuffled.slice(0, count);
  return await batchFetchArtworks(featured);
};

export default {
  loadKreativesWithArtworks,
  loadKreativesByCategory,
  getKreativesStats,
  searchKreatives,
  getFeaturedKreatives
};
