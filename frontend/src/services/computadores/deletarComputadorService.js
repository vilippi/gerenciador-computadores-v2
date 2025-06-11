const API_URL = 'http://localhost:3001/api/computadores';

export async function deleteComputador(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir computador');
    }

    return response.json();
}