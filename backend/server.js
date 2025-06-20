const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const computadoresRoutes = require('./routes/computadores/listaComputadores');
const cadastrarComputadorRoutes = require('./routes/computadores/cadastrarComputador');
const getComputadoresByIdRoute = require('./routes/computadores/getComputadoresById');
const editarComputadorRoute = require('./routes/computadores/editarComputador');
const deletarComputadorRoutes = require('./routes/computadores/deletarComputador');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado ao Banco de Dados!');
    })
    .catch((error) => {
        console.error('Erro ao conectar no Banco de Dados:', error);
    });

// Rotas
app.use('/api/auth', authRoutes);

app.use('/api/computadores', computadoresRoutes);
app.use('/api/registrarcomputador', cadastrarComputadorRoutes);
app.use('/api/computadores', getComputadoresByIdRoute);
app.use('/api/editarcomputador', editarComputadorRoute);
app.use('/api/computadores', deletarComputadorRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});