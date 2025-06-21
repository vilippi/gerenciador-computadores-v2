const API_URL = 'http://localhost:3001/api/historico';

export const getHistoricoPorComputador = async (computadorId, token) => {
    const response = await fetch(`${API_URL}/${computadorId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar histórico');
    }

    return await response.json();
};
