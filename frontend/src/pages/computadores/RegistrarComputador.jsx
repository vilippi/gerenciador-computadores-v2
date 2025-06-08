import {
  Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, Stack
} from '@mui/material';
import { useState } from 'react';
import { cadastrarComputador } from '../../services/computadores/registrarComputadorService';

const steps = ['Dados do Computador', 'Especificações Técnicas', 'Antigo Dono'];

const RegistrarComputador = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
  numero: '',
  marca: '',
  modelo: '',
  ram: '',
  armazenamento: '',
  processador: '',
  placaVideo: '',
  antigoDono: '',
  email: '',
  setor: '',
  empresa: '',
});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
  try {
    const token = sessionStorage.getItem('token'); // ou useAuth()

    await cadastrarComputador(formData, token);

    alert('Computador cadastrado com sucesso!');
  } catch (error) {
    alert('Erro ao cadastrar: ' + error.message);
  }
};

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField size='small' label="Número" name="numero" value={formData.numero} onChange={handleChange} fullWidth />
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Marca" name="marca" value={formData.marca} onChange={handleChange} fullWidth />
              <TextField size='small' label="Modelo" name="modelo" value={formData.modelo} onChange={handleChange} fullWidth />
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Processador" name="processador" value={formData.processador} onChange={handleChange} fullWidth />
              <TextField size='small' label="Placa de Vídeo" name="placaVideo" value={formData.placaVideo} onChange={handleChange} fullWidth />
            </Box>
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Memória RAM" name="ram" value={formData.ram} onChange={handleChange} fullWidth />
              <TextField size='small' label="Armazenamento" name="armazenamento" value={formData.armazenamento} onChange={handleChange} fullWidth />
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <TextField size='small' label="Nome" name="antigoDono" value={formData.antigoDono} onChange={handleChange} fullWidth />
            <TextField size='small' label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField size='small' label="Setor" name="setor" value={formData.setor} onChange={handleChange} fullWidth />
            <TextField size='small' label="Empresa" name="empresa" value={formData.empresa} onChange={handleChange} fullWidth />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        <Stack spacing={2} mt={3}>
          {renderStepContent()}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {activeStep > 0 && <Button onClick={prevStep}>Voltar</Button>}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={nextStep}>Próximo</Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleSubmit}>Salvar</Button>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegistrarComputador;