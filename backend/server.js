import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';

import computadoresRoutes from './routes/computadores/listaComputadores.js';
import cadastrarComputadorRoutes from './routes/computadores/cadastrarComputador.js';
import getComputadoresByIdRoute from './routes/computadores/getComputadoresById.js';
import editarComputadorRoute from './routes/computadores/editarComputador.js';
import deletarComputadorRoutes from './routes/computadores/deletarComputador.js';
import historicoRoutes from './routes/computadores/historicoComputador.js';

import iaRoutes from './routes/ia.js';

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
app.use('/api/historico', historicoRoutes);

app.use('/api/ia/analisar', iaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
