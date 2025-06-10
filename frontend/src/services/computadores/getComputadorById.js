const API_URL = 'http://localhost:3001/api/computadores';

export async function getComputadorById(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar computador');
    }

    return response.json();
}