const API_URL = 'http://localhost:3001/api/registrarcomputador';

export async function cadastrarComputador(data, token) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar computador');
    }

    return response.json();
}
