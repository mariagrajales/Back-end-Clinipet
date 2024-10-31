// src/controllers/dogController.js
const db = require('../config/db');

exports.registerDog = (req, res) => {
    const { userId, name, edad, raza, color, sexo } = req.body;

    db.query(
        'CALL InsertDog(?, ?, ?, ?, ?, ?)',
        [userId, name, edad, raza, color, sexo],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Perro registrado exitosamente' });
        }
    );
};

exports.getAllDogs = (req, res) => {
    db.query('CALL GetAllDogs()', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results[0]); // Devuelve el array de perros
    });
};
