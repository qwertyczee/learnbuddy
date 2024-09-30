// src/routes/authRoutes.js
const express = require('express');
const { chatbot, processVideo } = require('../controllers/openaiController');

const router = express.Router();

router.post('/chatbot', chatbot);
router.post('/process-video', processVideo);

module.exports = router;
