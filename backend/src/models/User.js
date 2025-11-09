const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Wallet-based authentication (primary identifier)
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    trim: true
  },
  
  // Profile information
  name: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    sparse: true  // Allow multiple nulls but unique if set
  },
  avatar: String,
  coverImage: String,
  
  // User type and role
  role: {
    type: String,
    enum: ['user', 'kreative', 'admin'],
    default: 'user'
  },
  isKreative: {
    type: Boolean,
    default: false
  },
  
  // Kreative-specific fields
  categories: [{
    type: String,
    enum: ['digital', 'sculpture', 'photography', 'painting', 'music', 'other']
  }],
  skills: [String],
  portfolio: String,  // URL to external portfolio
  
  // Social links
  social: {
    website: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  
  // Stats
  followersCount: {
    type: Number,
    default: 0,
    min: 0
  },
  followingCount: {
    type: Number,
    default: 0,
    min: 0
  },
  artworksCount: {
    type: Number,
    default: 0,
    min: 0
  },
  certificatesCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Location (privacy-protected)
  location: {
    street: String,        // NOT exposed in public APIs
    suburb: String,
    city: String,
    province: String,
    postalCode: String,
    country: {
      type: String,
      default: 'South Africa'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  
  // Authentication & security
  deviceId: String,      // Phenix device identifier
  nonce: String,         // For challenge-response auth
  nonceExpiry: Date,     // Challenge expiration
  lastNonceUsed: Date,   // Prevent replay attacks
  
  // Activity tracking
  eventsAttended: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  quizzesCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizSession'
  }],
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationLevel: {
    type: String,
    enum: ['none', 'email', 'phone', 'kyc'],
    default: 'none'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for performance
userSchema.index({ walletAddress: 1 });
userSchema.index({ role: 1, isKreative: 1 });
userSchema.index({ 'location.city': 1, 'location.province': 1 });
userSchema.index({ followersCount: -1 });
userSchema.index({ createdAt: -1 });

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.name || `${this.walletAddress.substring(0, 6)}...${this.walletAddress.substring(38)}`;
});

// Method to get public profile (hide sensitive data)
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    walletAddress: this.walletAddress,
    name: this.name,
    bio: this.bio,
    avatar: this.avatar,
    coverImage: this.coverImage,
    role: this.role,
    isKreative: this.isKreative,
    categories: this.categories,
    skills: this.skills,
    social: this.social,
    followersCount: this.followersCount,
    followingCount: this.followingCount,
    artworksCount: this.artworksCount,
    certificatesCount: this.certificatesCount,
    location: {
      // PRIVACY: Only return city, province, country
      city: this.location?.city,
      province: this.location?.province,
      country: this.location?.country
      // street, coordinates NOT included
    },
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
};

// Method to get private profile (for owner only)
userSchema.methods.toPrivateJSON = function() {
  const publicData = this.toPublicJSON();
  return {
    ...publicData,
    email: this.email,
    location: this.location,  // Full location for owner
    eventsAttended: this.eventsAttended,
    quizzesCompleted: this.quizzesCompleted,
    lastLogin: this.lastLogin
  };
};

module.exports = mongoose.model('User', userSchema);
