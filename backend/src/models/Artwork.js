const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  // Owner reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  kreativeName: String,  // Cached for display
  
  // Artwork details
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 2000
  },
  medium: {
    type: String,
    enum: ['digital', 'sculpture', 'photography', 'painting', 'mixed-media', 'other'],
    required: true
  },
  category: String,
  tags: [String],
  
  // File information
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: Number,  // bytes
  thumbnailUrl: String,
  dimensions: {
    width: Number,
    height: Number
  },
  
  // Blockchain/NFT data
  isNFT: {
    type: Boolean,
    default: false
  },
  nftData: {
    chain: {
      type: String,
      enum: ['ethereum', 'polygon', 'binance', 'other']
    },
    contractAddress: String,
    tokenId: String,
    tokenStandard: {
      type: String,
      enum: ['ERC-721', 'ERC-1155', 'other']
    },
    openseaUrl: String,
    metadataUrl: String,
    transactionHash: String,
    blockNumber: Number,
    mintedAt: Date
  },
  
  // Pricing and sales
  price: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'ETH',
    enum: ['ETH', 'MATIC', 'BNB', 'USD', 'ZAR']
  },
  priceUSD: Number,  // Cached for sorting/filtering
  forSale: {
    type: Boolean,
    default: false
  },
  royaltyPercentage: {
    type: Number,
    min: 0,
    max: 50,
    default: 10
  },
  
  // Stats
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  shares: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Collections
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  },
  editionNumber: Number,  // If part of limited edition
  totalEditions: Number,
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'sold'],
    default: 'published'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Indexes for performance
artworkSchema.index({ userId: 1, createdAt: -1 });
artworkSchema.index({ medium: 1, forSale: 1 });
artworkSchema.index({ category: 1, status: 1 });
artworkSchema.index({ isNFT: 1 });
artworkSchema.index({ price: 1, currency: 1 });
artworkSchema.index({ views: -1, likes: -1 });
artworkSchema.index({ tags: 1 });

// Virtual for display URL
artworkSchema.virtual('displayUrl').get(function() {
  return this.thumbnailUrl || this.fileUrl;
});

// Method to increment views
artworkSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

// Method to toggle like (returns new like count)
artworkSchema.methods.toggleLike = async function() {
  this.likes += 1;
  await this.save();
  return this.likes;
};

module.exports = mongoose.model('Artwork', artworkSchema);
