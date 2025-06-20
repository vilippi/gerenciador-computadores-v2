import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Stack, MenuItem, Grid } from '@mui/material';
import { getComputadorById } from '../../services/computadores/getComputadorById';
import { editarComputador } from '../../services/computadores/editarComputadorService';

const EditarComputador = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
    async function fetchData() {
        try {
            const token = sessionStorage.getItem('token');
            const computador = await getComputadorById(id, token);
            setFormData(computador);
        } catch (error) {
            console.error('Erro ao buscar computador:', error);
        }
    }
    fetchData();
}, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const token = sessionStorage.getItem('token');
        try {
            await editarComputador(id, formData, token);
            navigate('/computadores');
        } catch (error) {
            console.error(error.message);
            alert('Erro ao salvar alterações');
        }
    };


    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
                <Grid>
                    <Typography variant="body1" fontWeight={'bold'} gutterBottom>
                        Dados do Computador
                    </Typography>
                    <Grid display={'flex'} gap={2} mt={2}>
                        <TextField
                            size='small'
                            label="Número"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Disponível', 'No Suporte', 'Em Uso', 'Indisponível', 'Manutenção'].map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid display={'flex'} gap={2} mt={2} mb={2}>
                        <TextField
                            size='small'
                            label="Marca"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            label="Modelo"
                            name="modelo"
                            value={formData.modelo}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Typography variant="body1" fontWeight={'bold'} gutterBottom>
                        Especificações Técnicas
                    </Typography>
                    <Grid display={'flex'} gap={2} mt={2}>
                        <TextField
                            size='small'
                            label="Processador"
                            name="processador"
                            value={formData.processador}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            label="Placa de Vídeo"
                            name="placaVideo"
                            value={formData.placaVideo}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid display={'flex'} gap={2} mt={2} mb={2}>
                        <TextField
                            size='small'
                            label="RAM"
                            name="ram"
                            value={formData.ram}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            label="Armazenamento"
                            name="armazenamento"
                            value={formData.armazenamento}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Typography variant="body1" fontWeight={'bold'} gutterBottom>
                        Dados do Dono Atual
                    </Typography>
                    <TextField
                        sx={{mt:2}}
                        size='small'
                        label="Nome"
                        name="atualDono"
                        value={formData.atualDono}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        sx={{mt:2}}
                        size='small'
                        label="E-mail"
                        name="emailAtualDono"
                        value={formData.emailAtualDono}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Grid display={'flex'} gap={2} mt={2} mb={2}>
                        <TextField
                            size='small'
                            label="Setor"
                            name="setorAtualDono"
                            value={formData.setorAtualDono}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            label="Empresa"
                            name="empresaAtualDono"
                            value={formData.empresaAtualDono}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Typography variant="body1" fontWeight={'bold'} gutterBottom>
                        Dados do Antigo Dono
                    </Typography>
                    <TextField
                        sx={{mt:2}}
                        size='small'
                        label="Nome"
                        name="antigoDono"
                        value={formData.antigoDono}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        sx={{mt:2}}
                        size='small'
                        label="E-mail"
                        name="emailAntigoDono"
                        value={formData.emailAntigoDono}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Grid display={'flex'} gap={2} mt={2} mb={2}>
                        <TextField
                            size='small'
                            label="Setor"
                            name="setorAntigoDono"
                            value={formData.setorAntigoDono}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            size='small'
                            label="Empresa"
                            name="empresaAntigoDono"
                            value={formData.empresaAntigoDono}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Salvar
                </Button>
            </Paper>
        </Box>
    );
};

export default EditarComputador;