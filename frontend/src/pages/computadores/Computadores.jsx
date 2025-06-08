
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Chip, Stack, Typography, TextField, MenuItem, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';

const computadoresMock = [
    { id: 1003, marca: 'Dell', modelo: 'Inspiron 15', status: 'Funcionando' },
    { id: 1004, marca: 'HP', modelo: 'Pavilion', status: 'No Suporte' },
    { id: 1005, marca: 'Lenovo', modelo: 'ThinkPad', status: 'No Suporte' },
    { id: 1006, marca: 'Dell', modelo: 'Inspiron 13', status: 'Precisa de Melhoria' },
    { id: 1007, marca: 'Sony', modelo: 'Vaio', status: "Mal Funcionamento" }
];

const getStatusChip = (status) => {
    const statusMap = {
        Funcionando: { label: 'Funcionando', color: '#00e6b8', bg: '#e0fff9' },
        "No Suporte": { label: 'No Suporte', color: '#ffb300', bg: '#fff3e0' },
        "Precisa de Melhoria": { label: 'Precisa de Melhoria', color: '#3f51b5', bg: '#e8eaf6' },
        "Mal Funcionamento": { label: 'Mal Funcionamento', color: '#f44336', bg: '#ffebee' },
    };

    const s = statusMap[status] || { label: status, color: '#777', bg: '#eee' };

    return (
        <Chip
            label={s.label}
            size="small"
            sx={{
                backgroundColor: s.bg,
                color: s.color,
                fontWeight: 'bold',
                borderRadius: '8px',
                px: 1.5,
                py: 0.5,
            }}
        />
    );
};

const options = ['ID', 'Marca', 'Modelo', 'Status'];


    const Computadores = () => {

        const [filtroSelecionado, setFiltroSelecionado] = useState('ID');
        const [valorFiltro, setValorFiltro] = useState('');
        const renderInputField = () => {
            switch (filtroSelecionado) {
                case 'Status':
                    return (
                        <TextField
                            sx={{width:'200px'}}
                            label="Status"
                            select
                            variant="outlined"
                            size="small"
                            value={valorFiltro}
                            onChange={(e) => setValorFiltro(e.target.value)}
                        >
                            {['Funcionando', "No Suporte", "Precisa de Melhoria", "Mal Funcionamento"].map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </TextField>
                    );
                default:
                return (
                    <TextField
                        sx={{width:'200px'}}
                        label={filtroSelecionado}
                        variant="outlined"
                        size="small"
                        value={valorFiltro}
                        onChange={(e) => setValorFiltro(e.target.value)}
                    />
                );
            }
        };

        const handleVerEditar = (id) => {
            alert(`Visualizar ou editar computador ID: ${id}`);
            // Aqui você pode navegar para outra rota, por exemplo: navigate(`/computadores/${id}`)
        };

    return (
        <Box style={{ padding: 32 }}>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack spacing={2}>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                        sx={{width:'110px'}}
                            label="Filtro"
                            select
                            variant="outlined"
                            size="small"
                            value={filtroSelecionado}
                            onChange={(e) => {
                                setFiltroSelecionado(e.target.value);
                                setValorFiltro(''); // limpa o valor ao trocar o filtro
                            }}
                        >
                            {options.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </TextField>

                        {renderInputField()}
                    </Stack>
                </Stack>
            </Paper>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:'bold'}}>ID</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Marca</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Modelo</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
                            <TableCell sx={{fontWeight:'bold'}} align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {computadoresMock.map((pc) => (
                            <TableRow key={pc.id}>
                            <TableCell>{pc.id}</TableCell>
                            <TableCell>{pc.marca}</TableCell>
                            <TableCell>{pc.modelo}</TableCell>
                            <TableCell>{getStatusChip(pc.status)}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleVerEditar(pc.id)}>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ Box>
    );
};

export default Computadores;