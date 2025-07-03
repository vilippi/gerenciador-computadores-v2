import { useEffect, useState } from 'react';

export default function TestarHardware() {
  const [hardware, setHardware] = useState(null);

  useEffect(() => {
    async function carregarHardware() {
      try {
        const info = await window.hardwareAPI.reconhecer();
        setHardware(info);
      } catch (err) {
        console.error('Erro ao reconhecer hardware:', err);
      }
    }

    carregarHardware();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔧 Informações de Hardware</h1>

      {!hardware ? (
        <p>Carregando informações...</p>
      ) : (
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Processador:</strong> {hardware.processador}</li>
          <li><strong>Memória RAM:</strong> {hardware.ram}</li>
          <li><strong>Armazenamento:</strong> {hardware.armazenamento}</li>
          <li><strong>Placa de Vídeo:</strong> {hardware.placaVideo}</li>
        </ul>
      )}
    </div>
  );
}
