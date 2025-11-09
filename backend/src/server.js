const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3001', 'http://192.168.8.100:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB Connected');
      console.log('📊 Database:', mongoose.connection.name);
    })
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.log('⚠️  App will run but database features disabled');
    });
} else {
  console.log('⚠️  No MONGODB_URI found in .env - running without database');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AfriKreate API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to AfriKreate API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      kreatives: '/api/kreatives',
      artworks: '/api/artworks',
      events: '/api/events',
      learn: '/api/learn'
    }
  });
});

// Import route handlers
const authRoutes = require('./routes/auth');
const kreativeRoutes = require('./routes/kreatives');
const artworkRoutes = require('./routes/artworks');
const eventRoutes = require('./routes/events');
const learnRoutes = require('./routes/learn');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/kreatives', kreativeRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/learn', learnRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('═══════════════════════════════════════════════════');
  console.log('🚀 AfriKreate Backend API');
  console.log('═══════════════════════════════════════════════════');
  console.log(`📍 Local:    http://localhost:${PORT}`);
  console.log(`📱 Network:  http://192.168.8.100:${PORT}`);
  console.log(`💚 Health:   http://localhost:${PORT}/health`);
  console.log('═══════════════════════════════════════════════════');
});

module.exports = app;
