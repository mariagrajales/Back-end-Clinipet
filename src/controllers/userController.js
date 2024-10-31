const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    const { nombre, apellidoP, apellidoM, edad, phone, username, password, rol_id } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellidoP, apellidoM, edad, phone, username, hashedPassword, rol_id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Error al hashear la contraseña' });
    }
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    db.query('CALL GetUserByUsername(?)', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results[0].length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0][0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, rol_id: user.rol_id },
            'SECRET_KEY', // Reemplaza 'SECRET_KEY' con una clave segura
            { expiresIn: '1h' }
        );

        // Enviar el token en una cookie y en la respuesta JSON
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Asegura la cookie en producción
            sameSite: 'strict',
        });

        // Incluir el token en el JSON de respuesta
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
};


exports.getUsersByRole = (req, res) => {
    const rol_id = 2;

    db.query('CALL GetUsersByRole(?)', [rol_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results[0]);
    });
};