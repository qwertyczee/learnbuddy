// src/routes/userRoutes.js
const express = require('express');
const { getUser, updateUser } = require('../controllers/userController'); // Implement these functions

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;
