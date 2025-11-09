const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/challenge - Generate authentication challenge
router.post('/challenge', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Valid wallet address required' });
    }
    
    // Generate random nonce
    const nonce = ethers.hexlify(ethers.randomBytes(32));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    // Save or update user with nonce
    await User.findOneAndUpdate(
      { walletAddress: walletAddress.toLowerCase() },
      { 
        nonce,
        nonceExpiry: expiresAt
      },
      { upsert: true, new: true }
    );
    
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

// POST /api/auth/verify - Verify signed challenge and login
router.post('/verify', async (req, res) => {
  try {
    const { walletAddress, signature, deviceId } = req.body;
    
    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Wallet address and signature required' });
    }
    
    // Find user and check nonce
    const user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase()
    });
    
    if (!user || !user.nonce || !user.nonceExpiry) {
      return res.status(400).json({ error: 'No active challenge found. Please request a new challenge.' });
    }
    
    // Check if nonce expired
    if (new Date() > user.nonceExpiry) {
      return res.status(400).json({ error: 'Challenge expired. Please request a new one.' });
    }
    
    // Verify signature
    const message = `Sign this message to authenticate with AfriKreate:\n\nNonce: ${user.nonce}\nTimestamp: ${user.nonceExpiry.toISOString()}`;
    
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Signature verification failed' });
    }
    
    // Valid! Update user and generate tokens
    user.deviceId = deviceId || user.deviceId;
    user.lastLogin = new Date();
    user.nonce = null;  // Clear used nonce
    user.nonceExpiry = null;
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        walletAddress: user.walletAddress,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: user.toPublicJSON()
    });
    
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
