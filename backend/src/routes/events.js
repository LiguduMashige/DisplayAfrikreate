const express = require('express');
const router = express.Router();

// Mock events data for demo (will be replaced with database later)
const mockEvents = [
  {
    id: '1',
    title: 'Cape Town Digital Art Festival',
    description: 'Annual showcase of digital art from across Africa',
    category: 'Art Exhibition',
    start: '2025-12-15T10:00:00Z',
    end: '2025-12-17T18:00:00Z',
    location: {
      venue: 'Cape Town Convention Centre',
      city: 'Cape Town',
      province: 'Western Cape',
      country: 'South Africa'
    },
    imageUrl: 'https://picsum.photos/800/400?random=1',
    price: 0,
    rsvpCount: 234
  },
  {
    id: '2',
    title: 'Johannesburg Tech & Blockchain Night',
    description: 'Connect with tech innovators and blockchain developers',
    category: 'Tech',
    start: '2025-12-20T18:00:00Z',
    end: '2025-12-20T22:00:00Z',
    location: {
      venue: 'The Workshop',
      city: 'Johannesburg',
      province: 'Gauteng',
      country: 'South Africa'
    },
    imageUrl: 'https://picsum.photos/800/400?random=2',
    price: 50,
    rsvpCount: 89
  },
  {
    id: '3',
    title: 'NFT Workshop for Artists',
    description: 'Learn how to create and sell your first NFT',
    category: 'Workshop',
    start: '2026-01-10T14:00:00Z',
    end: '2026-01-10T17:00:00Z',
    location: {
      venue: 'Creative Hub',
      city: 'Durban',
      province: 'KwaZulu-Natal',
      country: 'South Africa'
    },
    imageUrl: 'https://picsum.photos/800/400?random=3',
    price: 100,
    rsvpCount: 45
  },
  {
    id: '4',
    title: 'African Music & Art Fusion',
    description: 'Experience the blend of traditional and contemporary',
    category: 'Music',
    start: '2026-01-25T19:00:00Z',
    end: '2026-01-25T23:00:00Z',
    location: {
      venue: 'Market Theatre',
      city: 'Johannesburg',
      province: 'Gauteng',
      country: 'South Africa'
    },
    imageUrl: 'https://picsum.photos/800/400?random=4',
    price: 150,
    rsvpCount: 178
  },
  {
    id: '5',
    title: 'Creative Networking Mixer',
    description: 'Meet fellow creatives and potential collaborators',
    category: 'Networking',
    start: '2026-02-05T18:30:00Z',
    end: '2026-02-05T21:00:00Z',
    location: {
      venue: 'The Workspace',
      city: 'Cape Town',
      province: 'Western Cape',
      country: 'South Africa'
    },
    imageUrl: 'https://picsum.photos/800/400?random=5',
    price: 0,
    rsvpCount: 67
  }
];

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const { category, from, to } = req.query;
    
    let filteredEvents = [...mockEvents];
    
    // Filter by category
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(e => e.category === category);
    }
    
    // Filter by date range
    if (from) {
      filteredEvents = filteredEvents.filter(e => new Date(e.start) >= new Date(from));
    }
    if (to) {
      filteredEvents = filteredEvents.filter(e => new Date(e.start) <= new Date(to));
    }
    
    res.json(filteredEvents);
    
  } catch (error) {
    console.error('Events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  try {
    const event = mockEvents.find(e => e.id === req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
    
  } catch (error) {
    console.error('Event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events/:id/rsvp - RSVP to event
router.post('/:id/rsvp', async (req, res) => {
  try {
    const event = mockEvents.find(e => e.id === req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // In real implementation, this would save to database
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

module.exports = router;
