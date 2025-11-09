const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');

// GET /api/artworks - Get artworks with filters
router.get('/', async (req, res) => {
  try {
    const { category, forSale, limit = 20 } = req.query;
    
    const query = { status: 'published' };
    if (category) query.medium = category;
    if (forSale === 'true') query.forSale = true;
    
    const artworks = await Artwork.find(query)
      .populate('userId', 'name avatar walletAddress')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(artworks);
    
  } catch (error) {
    console.error('Artworks error:', error);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// GET /api/artworks/:id - Get specific artwork
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)
      .populate('userId', 'name avatar walletAddress');
    
    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }
    
    // Increment views
    artwork.views += 1;
    await artwork.save();
    
    res.json(artwork);
    
  } catch (error) {
    console.error('Artwork error:', error);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});

module.exports = router;
