const express = require('express');
const router = express.Router();

// Mock learning content (will connect to database later)
const mockTopics = {
  'blockchain-basics': {
    slug: 'blockchain-basics',
    title: 'Blockchain Basics for Artists',
    summary: 'Learn the fundamentals of blockchain technology',
    difficulty: 'beginner',
    duration: '30 minutes',
    content: {
      introduction: 'Blockchain technology is revolutionizing the art world...',
      mainContent: 'At its core, blockchain is a distributed ledger...',
      practicalExample: 'Consider an NFT artwork on Ethereum...',
      conclusion: 'Understanding blockchain empowers artists...'
    },
    videos: [
      { id: 'rfQ8rKGTVvQ', title: 'What is Blockchain?' },
      { id: 'SSo_EIwHSd4', title: 'Blockchain for Beginners' }
    ]
  },
  'creating-nfts': {
    slug: 'creating-nfts',
    title: 'Creating & Selling NFTs',
    summary: 'Step-by-step guide to minting and selling your art as NFTs',
    difficulty: 'intermediate',
    duration: '45 minutes',
    content: {
      introduction: 'NFTs have opened new opportunities for artists...',
      mainContent: 'Creating an NFT involves several key steps...',
      practicalExample: 'Let\'s walk through minting on OpenSea...',
      conclusion: 'You\'re now ready to create your first NFT...'
    },
    videos: [
      { id: 'a8ww4aNlCdM', title: 'How to Create NFTs' },
      { id: 'YXY_ZzW7MRw', title: 'Selling NFT Art' }
    ]
  },
  'smart-contracts': {
    slug: 'smart-contracts',
    title: 'Smart Contracts for Creators',
    summary: 'Understand and use smart contracts for your creative work',
    difficulty: 'advanced',
    duration: '60 minutes',
    content: {
      introduction: 'Smart contracts automate agreements...',
      mainContent: 'A smart contract is self-executing code...',
      practicalExample: 'Here\'s how royalties work in a smart contract...',
      conclusion: 'Smart contracts give you control...'
    },
    videos: [
      { id: 'ZE2HxTmxfrI', title: 'Smart Contracts Explained' },
      { id: 'pyaIppMhuic', title: 'Creating Smart Contracts' }
    ]
  }
};

// GET /api/learn/:topic - Get learning content
router.get('/:topic', async (req, res) => {
  try {
    const topic = mockTopics[req.params.topic];
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(topic);
    
  } catch (error) {
    console.error('Learn error:', error);
    res.status(500).json({ error: 'Failed to fetch learning content' });
  }
});

// GET /api/learn - Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = Object.values(mockTopics);
    res.json(topics);
  } catch (error) {
    console.error('Learn error:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

// POST /api/learn/:topic/quiz/start - Start quiz session
router.post('/:topic/quiz/start', async (req, res) => {
  try {
    const topic = mockTopics[req.params.topic];
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    // In real implementation, create QuizSession in database
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      sessionId,
      topic: topic.slug,
      message: 'Quiz session started',
      startedAt: new Date()
    });
    
  } catch (error) {
    console.error('Quiz start error:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
});

// PATCH /api/learn/quiz/:sessionId - Save quiz progress
router.patch('/quiz/:sessionId', async (req, res) => {
  try {
    const { answers, currentQuestion } = req.body;
    
    // In real implementation, update QuizSession in database
    
    res.json({
      success: true,
      message: 'Progress saved',
      savedAt: new Date()
    });
    
  } catch (error) {
    console.error('Quiz save error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// POST /api/learn/quiz/:sessionId/submit - Submit quiz
router.post('/quiz/:sessionId/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Mock scoring (in real implementation, check against correct answers)
    const score = Math.floor(Math.random() * 30) + 70; // 70-100 for demo
    const passed = score >= 50;
    
    res.json({
      success: true,
      score,
      percentage: score,
      passed,
      certificateId: passed ? `CERT_${Date.now()}` : null,
      message: passed ? 'Congratulations! You passed!' : 'Keep learning and try again.'
    });
    
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

module.exports = router;
