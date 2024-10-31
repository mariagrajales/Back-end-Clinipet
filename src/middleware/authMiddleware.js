// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Inicia sesión.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Usa la misma clave secreta que en el login
        req.user = decoded; // Almacena la información del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
};

exports.authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.rol_id)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    next();
};
