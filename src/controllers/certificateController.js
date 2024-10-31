const db = require('../config/db');

exports.registerCertificate = (req, res) => {
    const { userId, dogId, vaccineName, creationDate } = req.body;

    db.query(
        'CALL InsertCertificate(?, ?, ?, ?)',
        [userId, dogId, vaccineName, creationDate],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Certificado de vacunación registrado exitosamente' });
        }
    );
};

exports.getCertificatesByDogId = (req, res) => {
    const { dogId } = req.params; // Obtén el dogId de los parámetros de la URL

    db.query('CALL GetCertificatesByDogId(?)', [dogId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results[0]); // Devuelve el array de certificados para el perro
    });
};

exports.getCertificateDetailsByVaccineId = (req, res) => {
    const { vaccineId } = req.params; // Obtener vaccineId de los parámetros de la URL

    db.query('CALL GetCertificateDetailsByVaccineId(?)', [vaccineId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results[0].length === 0) {
            return res.status(404).json({ message: 'Certificado no encontrado para el ID de vacuna especificado' });
        }
        res.status(200).json(results[0][0]); // Devuelve los detalles del certificado
    });
};