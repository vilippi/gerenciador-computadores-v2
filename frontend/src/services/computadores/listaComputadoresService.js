const API_URL = 'http://localhost:3001/api/computadores';

export async function listaComputadores() {
    const token = sessionStorage.getItem('token');

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar computadores');
    }

    return response.json();

}
