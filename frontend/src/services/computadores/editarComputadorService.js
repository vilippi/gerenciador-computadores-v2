const API_URL = 'http://localhost:3001/api/editarcomputador';

export async function editarComputador(id, computador, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(computador)
    });

    if (!response.ok) {
        throw new Error('Erro ao editar computador');
    }

    return response.json();
}