// src/app.js
const express = require('express');
const cookieParser = require('cookie-parser'); // Importa cookie-parser
const app = express();
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

app.use(express.json());
app.use(cookieParser()); // Habilita cookie-parser

app.use(cors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde tu frontend de Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.use('/api', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/certificates', certificateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
