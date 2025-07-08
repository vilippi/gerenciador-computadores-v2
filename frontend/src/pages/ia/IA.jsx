import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
} from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';
import MessageItem from '../../components/ia/MessageItem';

const IA = () => {

    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'Olá! Como posso ajudá-lo hoje?',
            isAI: true,
            timestamp: new Date(),
        },
    ]);

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateAIResponse = (userMessage) => {
        const responses = [
            'Entendi sua solicitação. Como posso ajudá-lo mais especificamente?',
            'Interessante! Vou analisar isso para você.',
            'Ótima pergunta! Deixe-me pensar na melhor resposta.',
            'Posso ajudá-lo com isso. Precisa de mais alguma informação?',
            'Compreendo. Vou processar sua solicitação.',
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() && uploadedImages.length === 0) return;

        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            isAI: false,
            timestamp: new Date(),
            images: uploadedImages.length > 0 ? [...uploadedImages] : undefined,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setUploadedImages([]);
        setIsLoading(true);

        setTimeout(() => {
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                text: generateAIResponse(inputText),
                isAI: true,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setUploadedImages(prev => [...prev, e.target.result]);
                    }
                };
                reader.readAsDataURL(file);
            });
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
                            AI está digitando...
                        </Typography>
                    </Box>
                )}
            </Paper>

            {uploadedImages.length > 0 && (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Imagens anexadas:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {uploadedImages.map((image, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={image}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                
                    <IconButton
                        size="small"
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ mb: 1 }}
                    >
                        <AttachFile />
                    </IconButton>
                
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
                            mb:1
                        }}
                    />
                
                    <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() && uploadedImages.length === 0}
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
