/**
 * NFT Service - Alchemy API Integration
 * Fetches real NFT artworks from blockchain for AfriKreate artists
 */

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY || 'demo';
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Fallback NFT collections for different art categories
const CATEGORY_COLLECTIONS = {
  'digital art': [
    '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', // CryptoPunks
    '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
    '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'  // MAYC
  ],
  'visual art': [
    '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e', // Doodles
    '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6', // Wrapped CryptoPunks
    '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B'  // CloneX
  ],
  'photography': [
    '0x31385d3520bCED94f77AaE104b406994D8F2168C', // PROOF Collective
    '0xd1258DB6Ac08eB0e625B75b371C023dA478E94A9', // DigiDaigaku
    '0x1A92f7381B9F03921564a437210bB9396471050C'  // Cool Cats
  ],
  'graphic design': [
    '0xED5AF388653567Af2F388E6224dC7C4b3241C544', // Azuki
    '0x23581767a106ae21c074b2276D25e5C3e136a68b', // Moonbirds
    '0x769272677faB02575E84945F03Eca517ACc544Cc'  // Otherside
  ],
  'animation': [
    '0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258', // Otherdeed Expanded
    '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7', // Meebits
    '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270'  // Art Blocks
  ]
};

/**
 * Fetch NFTs from Alchemy API
 */
export const fetchNFTsFromAlchemy = async (contractAddress, startToken = 0, limit = 5) => {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getNFTsForCollection',
        params: [
          contractAddress,
          {
            startToken: startToken.toString(),
            limit: limit,
            withMetadata: true
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.result && data.result.nfts) {
      return data.result.nfts.map((nft, index) => ({
        artwork_id: `${contractAddress}_${startToken + index}`,
        title: nft.title || nft.metadata?.name || `Artwork #${nft.id.tokenId}`,
        size: 'NFT',
        medium: 'Blockchain Art',
        description: nft.description || nft.metadata?.description || 'Unique digital artwork on blockchain',
        image: nft.media?.[0]?.gateway || nft.metadata?.image || 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=NFT',
        price: generateRealisticPrice(),
        tokenId: nft.id.tokenId,
        contract: contractAddress
      }));
    }
    
    return generateFallbackArtworks(limit);
  } catch (error) {
    console.error('Error fetching NFTs from Alchemy:', error);
    return generateFallbackArtworks(limit);
  }
};

/**
 * Get NFTs for a specific category
 */
export const fetchArtworksByCategory = async (category, limit = 5) => {
  const collections = CATEGORY_COLLECTIONS[category.toLowerCase()] || CATEGORY_COLLECTIONS['digital art'];
  const randomCollection = collections[Math.floor(Math.random() * collections.length)];
  const startToken = Math.floor(Math.random() * 100); // Random starting point
  
  return await fetchNFTsFromAlchemy(randomCollection, startToken, limit);
};

/**
 * Generate realistic NFT price in ETH
 */
const generateRealisticPrice = () => {
  const prices = [0.05, 0.1, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 5.0, 10.0];
  const price = prices[Math.floor(Math.random() * prices.length)];
  return `${price} ETH`;
};

/**
 * Generate fallback artworks if API fails
 */
const generateFallbackArtworks = (count = 5) => {
  const artTypes = ['Abstract', 'Portrait', 'Landscape', 'Digital', 'Generative'];
  const mediums = ['Digital Art', 'NFT', 'Blockchain Art', 'Crypto Art', 'Web3 Art'];
  
  return Array.from({ length: count }, (_, i) => ({
    artwork_id: `fallback_${Date.now()}_${i}`,
    title: `${artTypes[i % artTypes.length]} Creation ${i + 1}`,
    size: 'NFT',
    medium: mediums[i % mediums.length],
    description: 'Unique digital artwork showcasing African creativity on blockchain',
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${Date.now()}_${i}&backgroundColor=8b5cf6,ec4899,3b82f6`,
    price: generateRealisticPrice(),
    tokenId: `${i}`,
    contract: '0x0000000000000000000000000000000000000000'
  }));
};

/**
 * Fetch floor price for a collection
 */
export const fetchCollectionFloorPrice = async (contractAddress) => {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getFloorPrice',
        params: [contractAddress]
      })
    });

    const data = await response.json();
    return data.result?.openSea?.floorPrice || 0;
  } catch (error) {
    console.error('Error fetching floor price:', error);
    return 0;
  }
};

/**
 * Batch fetch artworks for multiple artists
 */
export const batchFetchArtworks = async (artists) => {
  const promises = artists.map(artist => 
    fetchArtworksByCategory(artist.category, 5)
  );
  
  try {
    const results = await Promise.all(promises);
    return artists.map((artist, index) => ({
      ...artist,
      artworks: results[index]
    }));
  } catch (error) {
    console.error('Error batch fetching artworks:', error);
    return artists.map(artist => ({
      ...artist,
      artworks: generateFallbackArtworks(5)
    }));
  }
};

export default {
  fetchNFTsFromAlchemy,
  fetchArtworksByCategory,
  fetchCollectionFloorPrice,
  batchFetchArtworks
};
