export const enviarPromptParaIA = async (prompt) => {
    try {
        const response = await fetch('http://localhost:3001/api/ia/analisar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao se comunicar com a IA');
        }

        return data.resposta;
    } catch (error) {
        console.error('Erro em iaService:', error);
        throw error;
    }
};