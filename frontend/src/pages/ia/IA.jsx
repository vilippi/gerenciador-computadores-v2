import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';

const IA = () => {
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [respostaIA, setRespostaIA] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleEnviar = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('descricao', descricao);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const res = await fetch('/api/ia/analisar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setRespostaIA(data.resposta);
    } catch (error) {
      console.error(error);
      setRespostaIA('Erro ao processar análise.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🤖 Assistente de Manutenção (IA)
      </Typography>

      <TextField
        label="Descreva o problema"
        multiline
        rows={4}
        fullWidth
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Enviar Imagem
        <input type="file" hidden onChange={handleImagemChange} accept="image/*" />
      </Button>

      {imagem && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          📎 Imagem selecionada: {imagem.name}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleEnviar}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Analisar com IA'}
      </Button>

      {respostaIA && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">🔍 Resultado da IA:</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {respostaIA}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default IA;
