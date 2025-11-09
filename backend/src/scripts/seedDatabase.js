const mongoose = require('mongoose');
const User = require('../models/User');
const Artwork = require('../models/Artwork');
require('dotenv').config();

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Artwork.deleteMany({});
    console.log('✅ Cleared old data');

    // Create sample kreatives
    console.log('👥 Creating kreatives...');
    const kreatives = await User.insertMany([
      {
        walletAddress: '0x1234567890123456789012345678901234567890',
        name: 'Thabo Mokoena',
        bio: 'Digital artist exploring African futurism and contemporary tech culture. My work bridges traditional storytelling with blockchain innovation.',
        isKreative: true,
        role: 'kreative',
        categories: ['digital'],
        skills: ['3D Design', 'Digital Art', 'NFTs'],
        followersCount: 15420,
        artworksCount: 23,
        location: { 
          city: 'Johannesburg', 
          province: 'Gauteng',
          country: 'South Africa',
          coordinates: { lat: -26.2041, lng: 28.0473 }
        },
        avatar: 'https://i.pravatar.cc/150?img=12',
        isVerified: true
      },
      {
        walletAddress: '0x2345678901234567890123456789012345678901',
        name: 'Zanele Dlamini',
        bio: 'Sculptor and mixed media artist. Creating physical and digital art that celebrates African heritage.',
        isKreative: true,
        role: 'kreative',
        categories: ['sculpture', 'mixed-media'],
        skills: ['Sculpture', 'Mixed Media', '3D Scanning'],
        followersCount: 12850,
        artworksCount: 18,
        location: { 
          city: 'Cape Town', 
          province: 'Western Cape',
          country: 'South Africa',
          coordinates: { lat: -33.9249, lng: 18.4241 }
        },
        avatar: 'https://i.pravatar.cc/150?img=45',
        isVerified: true
      },
      {
        walletAddress: '0x3456789012345678901234567890123456789012',
        name: 'Lebo Khumalo',
        bio: 'Contemporary photographer capturing the spirit of modern Africa through lens and blockchain.',
        isKreative: true,
        role: 'kreative',
        categories: ['photography'],
        skills: ['Photography', 'Photo Editing', 'Visual Storytelling'],
        followersCount: 18900,
        artworksCount: 45,
        location: { 
          city: 'Durban', 
          province: 'KwaZulu-Natal',
          country: 'South Africa',
          coordinates: { lat: -29.8587, lng: 31.0218 }
        },
        avatar: 'https://i.pravatar.cc/150?img=33',
        isVerified: true
      },
      {
        walletAddress: '0x4567890123456789012345678901234567890123',
        name: 'Sipho Ndlovu',
        bio: 'Painter and visual artist. Traditional techniques meet digital innovation.',
        isKreative: true,
        role: 'kreative',
        categories: ['painting'],
        skills: ['Oil Painting', 'Acrylic', 'Digital Art'],
        followersCount: 9340,
        artworksCount: 31,
        location: { 
          city: 'Pretoria', 
          province: 'Gauteng',
          country: 'South Africa',
          coordinates: { lat: -25.7479, lng: 28.2293 }
        },
        avatar: 'https://i.pravatar.cc/150?img=51',
        isVerified: false
      },
      {
        walletAddress: '0x5678901234567890123456789012345678901234',
        name: 'Naledi Motsepe',
        bio: 'Digital sculptor creating immersive 3D experiences and NFT collections.',
        isKreative: true,
        role: 'kreative',
        categories: ['digital', 'sculpture'],
        skills: ['3D Modeling', 'VR Art', 'Animation'],
        followersCount: 21500,
        artworksCount: 67,
        location: { 
          city: 'Johannesburg', 
          province: 'Gauteng',
          country: 'South Africa',
          coordinates: { lat: -26.2041, lng: 28.0473 }
        },
        avatar: 'https://i.pravatar.cc/150?img=27',
        isVerified: true
      },
      {
        walletAddress: '0x6789012345678901234567890123456789012345',
        name: 'Kwame Osei',
        bio: 'Multimedia artist and creative technologist.',
        isKreative: true,
        role: 'kreative',
        categories: ['digital', 'mixed-media'],
        skills: ['Generative Art', 'Coding', 'Interactive Art'],
        followersCount: 7890,
        artworksCount: 12,
        location: { 
          city: 'Cape Town', 
          province: 'Western Cape',
          country: 'South Africa',
          coordinates: { lat: -33.9249, lng: 18.4241 }
        },
        avatar: 'https://i.pravatar.cc/150?img=68',
        isVerified: false
      },
      {
        walletAddress: '0x7890123456789012345678901234567890123456',
        name: 'Thandiwe Zuma',
        bio: 'Street photographer documenting urban culture and transformation.',
        isKreative: true,
        role: 'kreative',
        categories: ['photography'],
        skills: ['Street Photography', 'Documentary', 'Photo Essays'],
        followersCount: 14200,
        artworksCount: 89,
        location: { 
          city: 'Soweto', 
          province: 'Gauteng',
          country: 'South Africa',
          coordinates: { lat: -26.2678, lng: 27.8584 }
        },
        avatar: 'https://i.pravatar.cc/150?img=38',
        isVerified: true
      }
    ]);

    console.log(`✅ Created ${kreatives.length} kreatives`);

    // Create sample artworks
    console.log('🎨 Creating artworks...');
    const artworks = await Artwork.insertMany([
      {
        userId: kreatives[0]._id,
        kreativeName: kreatives[0].name,
        title: 'Ubuntu Dreams',
        description: 'A digital exploration of collective consciousness through African futurism. This piece represents the interconnectedness of our shared humanity.',
        medium: 'digital',
        category: 'Digital Art',
        tags: ['futurism', 'african', 'consciousness'],
        fileUrl: 'https://picsum.photos/600/600?random=1',
        fileType: 'image/jpeg',
        thumbnailUrl: 'https://picsum.photos/300/300?random=1',
        forSale: true,
        price: 0.5,
        currency: 'ETH',
        priceUSD: 1250,
        isNFT: true,
        nftData: {
          chain: 'ethereum',
          tokenStandard: 'ERC-721'
        },
        views: 2340,
        likes: 189,
        status: 'published'
      },
      {
        userId: kreatives[1]._id,
        kreativeName: kreatives[1].name,
        title: 'Ancestral Rhythms',
        description: 'A sculpture celebrating the connection between past and present, honoring our ancestors while looking toward the future.',
        medium: 'sculpture',
        category: 'Sculpture',
        tags: ['sculpture', 'heritage', 'tradition'],
        fileUrl: 'https://picsum.photos/600/600?random=2',
        fileType: 'image/jpeg',
        thumbnailUrl: 'https://picsum.photos/300/300?random=2',
        forSale: true,
        price: 1.2,
        currency: 'ETH',
        priceUSD: 3000,
        views: 1890,
        likes: 234,
        status: 'published'
      },
      {
        userId: kreatives[2]._id,
        kreativeName: kreatives[2].name,
        title: 'City Pulse',
        description: 'Capturing the vibrant energy of Johannesburg streets at golden hour.',
        medium: 'photography',
        category: 'Photography',
        tags: ['urban', 'street', 'johannesburg'],
        fileUrl: 'https://picsum.photos/600/400?random=3',
        fileType: 'image/jpeg',
        thumbnailUrl: 'https://picsum.photos/300/200?random=3',
        forSale: true,
        price: 0.3,
        currency: 'ETH',
        priceUSD: 750,
        isNFT: true,
        nftData: {
          chain: 'polygon',
          tokenStandard: 'ERC-721'
        },
        views: 3450,
        likes: 412,
        status: 'published'
      },
      {
        userId: kreatives[3]._id,
        kreativeName: kreatives[3].name,
        title: 'Sunset Over Table Mountain',
        description: 'Oil on canvas capturing the majestic beauty of Cape Town.',
        medium: 'painting',
        category: 'Painting',
        tags: ['landscape', 'oil', 'cape town'],
        fileUrl: 'https://picsum.photos/800/600?random=4',
        fileType: 'image/jpeg',
        thumbnailUrl: 'https://picsum.photos/400/300?random=4',
        forSale: true,
        price: 0.8,
        currency: 'ETH',
        priceUSD: 2000,
        views: 1234,
        likes: 156,
        status: 'published'
      },
      {
        userId: kreatives[4]._id,
        kreativeName: kreatives[4].name,
        title: 'Digital Metamorphosis',
        description: 'An immersive 3D experience exploring transformation and growth.',
        medium: 'digital',
        category: '3D Art',
        tags: ['3d', 'immersive', 'transformation'],
        fileUrl: 'https://picsum.photos/600/600?random=5',
        fileType: 'image/jpeg',
        thumbnailUrl: 'https://picsum.photos/300/300?random=5',
        forSale: true,
        price: 2.5,
        currency: 'ETH',
        priceUSD: 6250,
        isNFT: true,
        nftData: {
          chain: 'ethereum',
          tokenStandard: 'ERC-721'
        },
        views: 4567,
        likes: 890,
        status: 'published'
      }
    ]);

    console.log(`✅ Created ${artworks.length} artworks`);

    // Update artwork counts
    for (const kreative of kreatives) {
      const count = artworks.filter(a => a.userId.equals(kreative._id)).length;
      kreative.artworksCount = count;
      await kreative.save();
    }

    console.log('═══════════════════════════════════════════════════');
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════');
    console.log(`👥 Kreatives: ${kreatives.length}`);
    console.log(`🎨 Artworks: ${artworks.length}`);
    console.log('═══════════════════════════════════════════════════');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
