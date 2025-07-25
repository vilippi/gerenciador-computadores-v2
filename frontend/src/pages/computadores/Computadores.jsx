
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Chip, Stack, Typography, TextField, MenuItem, Button, Tooltip, TablePagination } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';
import { listaComputadores } from '../../services/computadores/listaComputadoresService';
import { deleteComputador } from '../../services/computadores/deletarComputadorService';
import { useNavigate } from 'react-router-dom';
import { exportarParaExcel } from '../../utils/exportaParaExcel';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const getStatusChip = (status) => {

    const statusMap = {
        Disponível: { label: 'Disponível', color: '#00e6b8', bg: '#e0fff9' },
        "No Suporte": { label: 'No Suporte', color: '#ffb300', bg: '#fff3e0' },
        "Em Uso": { label: 'Em Uso', color: '#3f51b5', bg: '#e8eaf6' },
        Indisponível: { label: 'Indisponível', color: '#f44336', bg: '#ffebee' },
        Manutenção: { label: 'Indisponível', color: '#f44336', bg: '#ffebee' },
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
        const navigate = useNavigate();

        const [computadores, setComputadores] = useState([]);

        useEffect(() => {
            const carregar = async () => {
                try {
                    const dados = await listaComputadores();
                    setComputadores(dados);
                } catch (err) {
                    console.error(err.message);
                }
            };

            carregar();
        }, []);

        const dadosFormatados = computadores.map((pc) => ({
            Número: pc.numero,
            Marca: pc.marca,
            Modelo: pc.modelo,
            Status: pc.status,
            AtualDono: pc.atualDono || '',
            AntigoDono: pc.antigoDono || '',
        }));


// Separação Filtros
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
        // Separação Filtros

        const handleDelete = async (id) => {
            const confirm = window.confirm('Tem certeza que deseja excluir este computador?');

                if (confirm) {
                    try {
                        const token = sessionStorage.getItem('token');
                        await deleteComputador(id, token);
                        alert('Computador excluído com sucesso!');
                    // Atualizar a lista (por exemplo, refazer o fetch ou filtrar localmente)
                    const dadosAtualizados = await listaComputadores();
                    setComputadores(dadosAtualizados);
                    } catch (error) {
                        alert(error.message);
                    }
                }
        };


        // Estados da paginação
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);

        // Cálculo dos itens visíveis
        const computadoresVisiveis = computadores.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

        // Handlers de paginação
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Voltar para a primeira página
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
                        
                        <Tooltip title="Atualizar Tabela">
                            <IconButton onClick={() => listaComputadores}>
                                <RefreshOutlinedIcon /> 
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Exportar para Excel (.xlsx)">
                            <IconButton onClick={() => exportarParaExcel(dadosFormatados, "lista_computadores.xlsx")}>
                                <FileCopyOutlinedIcon /> 
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Paper>


            <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead> 
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Número</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Modelo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dono Atual</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {computadoresVisiveis.map((pc) => (
                            <TableRow key={pc._id}>
                                <TableCell>{pc.numero}</TableCell>
                                <TableCell>{pc.marca}</TableCell>
                                <TableCell>{pc.modelo}</TableCell>
                                <TableCell>{pc.atualDono}</TableCell>
                                <TableCell>{getStatusChip(pc.status)}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/computadores/editar/${pc._id}`)} color="primary">
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(pc._id)} color="error">
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Paginação */}
                <TablePagination
                    component="div"
                    count={computadores.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Linhas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </TableContainer>

            
        </ Box>
    );
};

export default Computadores;