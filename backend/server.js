const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de Autenticação
app.use('/api/auth', authRoutes);

// Rota de computadores
const computadoresRoutes = require('./routes/computadores/listaComputadores');
app.use('/api/computadores', computadoresRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});