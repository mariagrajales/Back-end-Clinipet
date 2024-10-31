const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');


// Ruta para registrar un nuevo certificado de vacunación
router.post('/register', authenticateUser, authorizeRole([1]), certificateController.registerCertificate);
router.get('/dog/:dogId', authenticateUser, authorizeRole([1,2]), certificateController.getCertificatesByDogId);
router.get('/details/:vaccineId', authenticateUser, authorizeRole([1, 2]), certificateController.getCertificateDetailsByVaccineId);



module.exports = router;
