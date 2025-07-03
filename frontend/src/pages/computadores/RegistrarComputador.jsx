import {
  Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, Stack,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useState } from 'react';
import { cadastrarComputador } from '../../services/computadores/registrarComputadorService';

const steps = ['Dados do Computador', 'Especificações Técnicas', 'Antigo Dono', 'Dono Atual'];

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
    emailAntigoDono: '', 
    setorAntigoDono: '',
    empresaAntigoDono: '',
    atualDono: '',
    emailAtualDono: '',
    setorAtualDono: '',
    empresaAtualDono: '',
    status: ''
  });

  const resetarFormulario = () => {
    setFormData({
      numero: '',
      marca: '',
      modelo: '',
      ram: '',
      armazenamento: '',
      processador: '',
      placaVideo: '',
      antigoDono: '',
      emailAntigoDono: '', 
      setorAntigoDono: '',
      empresaAntigoDono: '',
      atualDono: '',
      emailAtualDono: '',
      setorAtualDono: '',
      empresaAtualDono: '',
      status: ''
    });
    setActiveStep(0); // volta para o primeiro passo
    setErros({}); // limpa erros
  };

  const [erros, setErros] = useState({});
  const validarEtapaAtual = () => {
    const novosErros = {};

    if (activeStep === 0) {
      if (!formData.numero) novosErros.numero = "Campo obrigatório";
      if (!formData.status) novosErros.status = "Campo obrigatório";
      if (!formData.marca) novosErros.marca = "Campo obrigatório";
      if (!formData.modelo) novosErros.modelo = "Campo obrigatório";
    }

    // outras etapas podem ser validadas aqui se quiser

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };



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
    resetarFormulario();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Número *" name="numero" value={formData.numero} onChange={handleChange} fullWidth error={!!erros.numero} helperText={erros.numero} />
              <TextField
                select
                label="Status *"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                size="small"
                error={!!erros.status} 
                helperText={erros.status}
              >
                  <MenuItem value="Disponível">Disponível</MenuItem>
                  <MenuItem value="No Suporte">No Suporte</MenuItem>
                  <MenuItem value="Em Uso">Em Uso</MenuItem>
                  <MenuItem value="Manutenção">Manutenção</MenuItem>
                  <MenuItem value="Mal Funcionamento">Mal Funcionamento</MenuItem>
                  <MenuItem value="Indísponivel">Indísponivel</MenuItem>
              </TextField>
            </Box>
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Marca *" name="marca" value={formData.marca} onChange={handleChange} fullWidth error={!!erros.marca} helperText={erros.marca}/>
              <TextField size='small' label="Modelo *" name="modelo" value={formData.modelo} onChange={handleChange} fullWidth error={!!erros.modelo} helperText={erros.modelo}/>
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
              <TextField
                select
                size="small"
                label="Memória RAM"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                fullWidth
              >
                {['4 GB', '8 GB', '16 GB', '32 GB', '64 GB'].map((ram) => (
                  <MenuItem key={ram} value={ram}>
                    {ram}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                size="small"
                label="Armazenamento"
                name="armazenamento"
                value={formData.armazenamento}
                onChange={handleChange}
                fullWidth
              >
                {['128 GB SSD', '256 GB SSD', '512 GB SSD', '1 TB SSD', '500 GB HD', '1 TB HD', '2 TB HD'].map((armazenamento) => (
                  <MenuItem key={armazenamento} value={armazenamento}>
                    {armazenamento}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              Pode pular essa etapa, caso não tenha os conhecimentos técnicos necessários.
            </Typography>
          </>
        );
      case 2:
        return (
          <>
            <TextField size='small' label="Nome" name="antigoDono" value={formData.antigoDono} onChange={handleChange} fullWidth />
            <TextField size='small' label="Email" name="emailAntigoDono" value={formData.emailAntigoDono} onChange={handleChange} fullWidth />
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Setor" name="setorAntigoDono" value={formData.setorAntigoDono} onChange={handleChange} fullWidth />
              <TextField size='small' label="Empresa" name="empresaAntigoDono" value={formData.empresaAntigoDono} onChange={handleChange} fullWidth />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              Pode pular essa etapa, caso esse computador não tenha um antigo dono.
            </Typography>
          </>
        );
        case 3:
        return (
          <>
            <TextField size='small' label="Nome" name="atualDono" value={formData.atualDono} onChange={handleChange} fullWidth />
            <TextField size='small' label="Email" name="emailAtualDono" value={formData.emailAtualDono} onChange={handleChange} fullWidth />
            <Box display={'flex'} gap={2}>
              <TextField size='small' label="Setor" name="setorAtualDono" value={formData.setorAtualDono} onChange={handleChange} fullWidth />
              <TextField size='small' label="Empresa" name="empresaAtualDono" value={formData.empresaAtualDono} onChange={handleChange} fullWidth />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              Pode pular essa etapa, caso esse computador não tenha um dono atualmente.
            </Typography>
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
              <Button variant="contained" onClick={() => { if (validarEtapaAtual()) nextStep(); }}>Próximo</Button>
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