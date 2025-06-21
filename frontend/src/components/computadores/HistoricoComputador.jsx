import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import { getHistoricoPorComputador } from "../../services/computadores/getHistoricoService";



const HistoricoComputador = ({ computadorId }) => {

    const [historico, setHistorico] = useState([]);
    useEffect(() => {
        const carregarHistorico = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const dados = await getHistoricoPorComputador(computadorId, token);
                // Ordenar por data decrescente
                const ordenado = dados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setHistorico(ordenado);
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        };

        carregarHistorico();
    }, [computadorId]);


    return (
        <Paper elevation={1}>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight={'bold'}>Descrição</Typography></TableCell>
                            {/* <TableCell>Alterado</TableCell> */}
                            <TableCell><Typography fontWeight={'bold'}>Data</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historico.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell><Typography sx={{whiteSpace:'pre-line'}}>{item.descricao}</Typography></TableCell>
                                {/* <TableCell>{item.alteradoPor}</TableCell> */}
                                <TableCell>{new Date(item.alteradoEm).toLocaleString('pt-BR')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default HistoricoComputador