const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/kreatives/top - Get top performing kreatives
router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const kreatives = await User.find({ isKreative: true })
      .sort({ followersCount: -1 })
      .limit(limit)
      .select('-nonce -nonceExpiry -deviceId');
    
    res.json(kreatives.map(k => k.toPublicJSON()));
    
  } catch (error) {
    console.error('Kreatives error:', error);
    res.status(500).json({ error: 'Failed to fetch kreatives' });
  }
});

// GET /api/kreatives/:id - Get specific kreative
router.get('/:id', async (req, res) => {
  try {
    const kreative = await User.findById(req.params.id);
    
    if (!kreative || !kreative.isKreative) {
      return res.status(404).json({ error: 'Kreative not found' });
    }
    
    res.json(kreative.toPublicJSON());
    
  } catch (error) {
    console.error('Kreative error:', error);
    res.status(500).json({ error: 'Failed to fetch kreative' });
  }
});

module.exports = router;
