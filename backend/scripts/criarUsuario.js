// backend/scripts/criarUsuario.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';

dotenv.config({ path: './backend/.env' }); // ✅ Caminho explícito

try {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = new Usuario({
    user: 'visualizador',
    password: '123456',
    role: 'visualizador'
  });

  await admin.save();
  console.log('✅ Usuário admin criado com sucesso com permissão "admin"!');

  await mongoose.disconnect();
} catch (error) {
  console.error('❌ Erro ao criar usuário:', error.message);
  process.exit(1);
}
