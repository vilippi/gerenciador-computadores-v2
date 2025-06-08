const API_URL = 'http://localhost:3001/api/auth/login';

export async function loginRequest(username, password) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: username, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Usuário ou senha inválidos');
    }

    return response.json();
}
