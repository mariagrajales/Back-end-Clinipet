// src/routes/dogRoutes.js
const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');

// Ruta para registrar un nuevo perro (solo veterinario)
router.post('/register', authenticateUser, authorizeRole([1]), dogController.registerDog);

// Ruta para obtener todos los perros (veterinario y dueño)
router.get('/all', authenticateUser, authorizeRole([1, 2]), dogController.getAllDogs);

module.exports = router;
