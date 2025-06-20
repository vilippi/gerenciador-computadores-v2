const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('../models/Usuario');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = new Usuario({
      user: 'admin',
      password: '123456'
    });

    await admin.save();
    console.log('✅ Usuário admin criado com sucesso!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));
