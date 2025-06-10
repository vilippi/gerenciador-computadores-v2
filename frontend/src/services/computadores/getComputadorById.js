const API_URL = 'http://localhost:3001/api/computador';

export async function getComputadorById(id, token) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar computador');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro em getComputadorById:', error);
        throw error;
    }
}