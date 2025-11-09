const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://192.168.8.100:3001'],
  credentials: true
}));
app.use(express.json());

// ============================================
// IN-MEMORY DATA STORE (Works without MongoDB!)
// ============================================

const inMemoryUsers = new Map();
const inMemoryKreatives = [
  {
    id: '1',
    walletAddress: '0x1234567890123456789012345678901234567890',
    name: 'Thabo Mokoena',
    bio: 'Digital artist exploring African futurism and blockchain innovation',
    isKreative: true,
    categories: ['digital'],
    followersCount: 15420,
    artworksCount: 23,
    location: { city: 'Johannesburg', province: 'Gauteng' },
    avatar: 'https://i.pravatar.cc/150?img=12',
    isVerified: true
  },
  {
    id: '2',
    walletAddress: '0x2345678901234567890123456789012345678901',
    name: 'Zanele Dlamini',
    bio: 'Sculptor and mixed media artist celebrating African heritage',
    isKreative: true,
    categories: ['sculpture'],
    followersCount: 12850,
    artworksCount: 18,
    location: { city: 'Cape Town', province: 'Western Cape' },
    avatar: 'https://i.pravatar.cc/150?img=45',
    isVerified: true
  },
  {
    id: '3',
    walletAddress: '0x3456789012345678901234567890123456789012',
    name: 'Lebo Khumalo',
    bio: 'Contemporary photographer capturing modern Africa',
    isKreative: true,
    categories: ['photography'],
    followersCount: 18900,
    artworksCount: 45,
    location: { city: 'Durban', province: 'KwaZulu-Natal' },
    avatar: 'https://i.pravatar.cc/150?img=33',
    isVerified: true
  },
  {
    id: '4',
    walletAddress: '0x4567890123456789012345678901234567890123',
    name: 'Sipho Ndlovu',
    bio: 'Painter blending traditional techniques with digital innovation',
    isKreative: true,
    categories: ['painting'],
    followersCount: 9340,
    artworksCount: 31,
    location: { city: 'Pretoria', province: 'Gauteng' },
    avatar: 'https://i.pravatar.cc/150?img=51',
    isVerified: false
  },
  {
    id: '5',
    walletAddress: '0x5678901234567890123456789012345678901234',
    name: 'Naledi Motsepe',
    bio: 'Digital sculptor creating immersive 3D NFT collections',
    isKreative: true,
    categories: ['digital', 'sculpture'],
    followersCount: 21500,
    artworksCount: 67,
    location: { city: 'Johannesburg', province: 'Gauteng' },
    avatar: 'https://i.pravatar.cc/150?img=27',
    isVerified: true
  },
  {
    id: '6',
    walletAddress: '0x6789012345678901234567890123456789012345',
    name: 'Kwame Osei',
    bio: 'Multimedia artist and creative technologist',
    isKreative: true,
    categories: ['digital', 'mixed-media'],
    followersCount: 7890,
    artworksCount: 12,
    location: { city: 'Cape Town', province: 'Western Cape' },
    avatar: 'https://i.pravatar.cc/150?img=68',
    isVerified: false
  },
  {
    id: '7',
    walletAddress: '0x7890123456789012345678901234567890123456',
    name: 'Thandiwe Zuma',
    bio: 'Street photographer documenting urban transformation',
    isKreative: true,
    categories: ['photography'],
    followersCount: 14200,
    artworksCount: 89,
    location: { city: 'Soweto', province: 'Gauteng' },
    avatar: 'https://i.pravatar.cc/150?img=38',
    isVerified: true
  }
];

const inMemoryArtworks = [
  {
    id: '1',
    userId: '1',
    title: 'Ubuntu Dreams',
    description: 'Digital exploration of collective consciousness through African futurism',
    medium: 'digital',
    fileUrl: 'https://picsum.photos/600/600?random=1',
    price: 0.5,
    currency: 'ETH',
    priceUSD: 1250,
    isNFT: true,
    nftData: { chain: 'ethereum', tokenStandard: 'ERC-721' },
    views: 2340,
    likes: 189
  },
  {
    id: '2',
    userId: '2',
    title: 'Ancestral Rhythms',
    description: 'Sculpture celebrating the connection between past and present',
    medium: 'sculpture',
    fileUrl: 'https://picsum.photos/600/600?random=2',
    price: 1.2,
    currency: 'ETH',
    priceUSD: 3000,
    views: 1890,
    likes: 234
  },
  {
    id: '3',
    userId: '3',
    title: 'City Pulse',
    description: 'Capturing the vibrant energy of Johannesburg streets',
    medium: 'photography',
    fileUrl: 'https://picsum.photos/600/400?random=3',
    price: 0.3,
    currency: 'ETH',
    priceUSD: 750,
    isNFT: true,
    nftData: { chain: 'polygon', tokenStandard: 'ERC-721' },
    views: 3450,
    likes: 412
  }
];

const inMemoryEvents = [
  {
    id: '1',
    title: 'Cape Town Digital Art Festival',
    category: 'Art Exhibition',
    start: '2025-12-15T10:00:00Z',
    location: { city: 'Cape Town', province: 'Western Cape' },
    rsvpCount: 234
  },
  {
    id: '2',
    title: 'Johannesburg Tech & Blockchain Night',
    category: 'Tech',
    start: '2025-12-20T18:00:00Z',
    location: { city: 'Johannesburg', province: 'Gauteng' },
    rsvpCount: 89
  },
  {
    id: '3',
    title: 'NFT Workshop for Artists',
    category: 'Workshop',
    start: '2026-01-10T14:00:00Z',
    location: { city: 'Durban', province: 'KwaZulu-Natal' },
    rsvpCount: 45
  }
];

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'AfriKreate Backend Running',
    database: 'In-Memory (no MongoDB needed)',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// AUTHENTICATION ENDPOINTS (Blockchain-based)
// ============================================

// POST /api/auth/challenge - Generate blockchain signing challenge
app.post('/api/auth/challenge', (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Valid wallet address required' });
    }
    
    // Generate random nonce for challenge-response authentication
    const nonce = ethers.hexlify(ethers.randomBytes(32));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    // Store nonce with wallet address
    inMemoryUsers.set(walletAddress.toLowerCase(), {
      walletAddress: walletAddress.toLowerCase(),
      nonce,
      nonceExpiry: expiresAt
    });
    
    res.json({
      nonce,
      message: `Sign this message to authenticate with AfriKreate:\n\nNonce: ${nonce}\nTimestamp: ${new Date().toISOString()}`,
      expiresAt
    });
    
  } catch (error) {
    console.error('Challenge error:', error);
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

// POST /api/auth/verify - Verify blockchain signature and login
app.post('/api/auth/verify', (req, res) => {
  try {
    const { walletAddress, signature, deviceId } = req.body;
    
    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Wallet address and signature required' });
    }
    
    const user = inMemoryUsers.get(walletAddress.toLowerCase());
    
    if (!user || !user.nonce) {
      return res.status(400).json({ error: 'No active challenge found' });
    }
    
    // Check if challenge expired
    if (new Date() > user.nonceExpiry) {
      return res.status(400).json({ error: 'Challenge expired' });
    }
    
    // Verify blockchain signature using Ethers.js
    const message = `Sign this message to authenticate with AfriKreate:\n\nNonce: ${user.nonce}\nTimestamp: ${user.nonceExpiry.toISOString()}`;
    
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Signature verification failed' });
    }
    
    // Valid! Generate JWT token
    user.deviceId = deviceId;
    user.lastLogin = new Date();
    user.nonce = null; // Clear used nonce (prevent replay attacks)
    
    const token = jwt.sign(
      { 
        walletAddress: user.walletAddress,
        deviceId: user.deviceId
      },
      process.env.JWT_SECRET || 'afrikreate_demo_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        walletAddress: user.walletAddress,
        lastLogin: user.lastLogin
      }
    });
    
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// ============================================
// KREATIVES ENDPOINTS
// ============================================

// GET /api/kreatives/top - Get top performing kreatives
app.get('/api/kreatives/top', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Sort by followers and return top N
    const topKreatives = [...inMemoryKreatives]
      .sort((a, b) => b.followersCount - a.followersCount)
      .slice(0, limit)
      .map(k => ({
        id: k.id,
        walletAddress: k.walletAddress,
        name: k.name,
        bio: k.bio,
        categories: k.categories,
        followersCount: k.followersCount,
        artworksCount: k.artworksCount,
        location: k.location, // Privacy: only city/province
        avatar: k.avatar,
        isVerified: k.isVerified
      }));
    
    res.json(topKreatives);
    
  } catch (error) {
    console.error('Kreatives error:', error);
    res.status(500).json({ error: 'Failed to fetch kreatives' });
  }
});

// ============================================
// ARTWORKS ENDPOINTS
// ============================================

// GET /api/artworks - Get artworks (NFT-ready)
app.get('/api/artworks', (req, res) => {
  try {
    const { category, limit = 20 } = req.query;
    
    let artworks = [...inMemoryArtworks];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      artworks = artworks.filter(a => a.medium === category);
    }
    
    res.json(artworks.slice(0, parseInt(limit)));
    
  } catch (error) {
    console.error('Artworks error:', error);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// ============================================
// EVENTS ENDPOINTS
// ============================================

// GET /api/events - Get events
app.get('/api/events', (req, res) => {
  try {
    const { category } = req.query;
    
    let events = [...inMemoryEvents];
    
    if (category && category !== 'all') {
      events = events.filter(e => e.category === category);
    }
    
    res.json(events);
    
  } catch (error) {
    console.error('Events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /api/events/:id/rsvp - RSVP to event
app.post('/api/events/:id/rsvp', (req, res) => {
  try {
    const event = inMemoryEvents.find(e => e.id === req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    event.rsvpCount += 1;
    
    res.json({ 
      success: true,
      message: 'RSVP confirmed',
      event
    });
    
  } catch (error) {
    console.error('RSVP error:', error);
    res.status(500).json({ error: 'Failed to RSVP' });
  }
});

// ============================================
// LEARNING ENDPOINTS
// ============================================

const learnTopics = {
  'blockchain-basics': {
    slug: 'blockchain-basics',
    title: 'Blockchain Basics for Artists',
    summary: 'Learn the fundamentals of blockchain technology',
    difficulty: 'beginner',
    duration: '30 minutes'
  },
  'creating-nfts': {
    slug: 'creating-nfts',
    title: 'Creating & Selling NFTs',
    summary: 'Step-by-step guide to minting and selling your art as NFTs',
    difficulty: 'intermediate',
    duration: '45 minutes'
  },
  'smart-contracts': {
    slug: 'smart-contracts',
    title: 'Smart Contracts for Creators',
    summary: 'Understand and use smart contracts for your creative work',
    difficulty: 'advanced',
    duration: '60 minutes'
  }
};

// GET /api/learn/:topic
app.get('/api/learn/:topic', (req, res) => {
  try {
    const topic = learnTopics[req.params.topic];
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(topic);
    
  } catch (error) {
    console.error('Learn error:', error);
    res.status(500).json({ error: 'Failed to fetch learning content' });
  }
});

// POST /api/learn/:topic/quiz/start
app.post('/api/learn/:topic/quiz/start', (req, res) => {
  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      sessionId,
      message: 'Quiz session started',
      startedAt: new Date()
    });
    
  } catch (error) {
    console.error('Quiz start error:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
});

// ============================================
// ERROR HANDLERS
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('🚀 AfriKreate Backend API - READY!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`📍 Local:    http://localhost:${PORT}`);
  console.log(`📱 Network:  http://192.168.8.100:${PORT}`);
  console.log(`💚 Health:   http://localhost:${PORT}/health`);
  console.log('');
  console.log('✅ Working with in-memory data (no MongoDB needed!)');
  console.log('✅ Blockchain authentication ready (Ethers.js)');
  console.log('✅ NFT-ready data structures');
  console.log('✅ Privacy-protected user data');
  console.log('✅ 7 Kreatives, 3 Artworks, 3 Events loaded');
  console.log('═══════════════════════════════════════════════════');
  console.log('');
});

module.exports = app;
