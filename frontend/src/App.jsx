import React from 'react';

import '../index.css'

import Sidebar from '../components/common/Sidebar';

export default function App() {
  const registrarComputador = () => {
    alert('Ir para tela de registro');
  };

  const verComputadores = () => {
    alert('Ir para listagem');
  };

  const gerenciarUsuario = () => {
    alert('Ir para cadastro de usuário');
  };

  return (
    <>
      <Sidebar
        onRegistrar={registrarComputador}
        onListar={verComputadores}
        onGerenciarUsuario={gerenciarUsuario}
      />

      {/* Aqui você pode exibir o Dashboard */}
    </>
  );
}