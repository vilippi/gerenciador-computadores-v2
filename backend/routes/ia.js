import express from 'express';
import { GoogleGenAI  } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt não fornecido.' });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                    systemInstruction: "Você é um assistente técnico especializado em diagnóstico e manutenção de hardware de computadores.",
                    temperature: 0.5,
                },
            },
        });

        res.status(200).json({
            message: 'Resposta gerada com sucesso.',
            resposta: response.text,
        });
    } catch (error) {
        console.error('Erro ao processar IA:', error);
        res.status(500).json({ message: 'Erro ao processar IA Gemini.' });
    }
});

export default router;
