const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors({ 
  origin: ['http://localhost:3000'], 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', openaiRoutes);

app.use(errorHandler);

module.exports = app;
