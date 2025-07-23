import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import MessageItem from '../../components/ia/MessageItem';
import { enviarPromptParaIA } from '../../services/ia/iaService';

const IA = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'Olá! Como posso ajudá-lo?',
            isAI: true,
            timestamp: new Date(),
        },
    ]);

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            isAI: false,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const resposta = await enviarPromptParaIA(inputText);

            const aiResponse = {
                id: (Date.now() + 1).toString(),
                text: resposta || 'Sem resposta da IA.',
                isAI: true,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    text: ' Erro ao obter resposta da IA.',
                    isAI: true,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box style={{ padding: 32 }}>
            <Paper sx={{ p: 2, mb: 3 }}>
                {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
                {isLoading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2" color="text.secondary">
                            IA está digitando...
                        </Typography>
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={3}
                        placeholder="Digite sua mensagem..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                            mb: 1,
                        }}
                    />

                    <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        sx={{ mb: 1 }}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default IA;
