import ReactMarkdown from 'react-markdown';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { Lightbulb, Person } from '@mui/icons-material';

const MessageItem = ({ message }) => {
    const isAI = message.isAI;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isAI ? 'flex-start' : 'flex-end',
                alignItems: 'flex-start',
                mb: 2,
            }}
        >
            {isAI && (
                <Avatar sx={{ bgcolor: '#1976d2', mr: 1, width: 32, height: 32 }}>
                    <Lightbulb fontSize="small" />
                </Avatar>
            )}

            <Paper
                elevation={3}
                sx={{
                    p: 1.5,
                    maxWidth: '60%',
                    wordBreak: 'break-word',
                    borderRadius: 2,
                }}
            >
                <ReactMarkdown>{message.text}</ReactMarkdown>
            </Paper>

            {!isAI && (
                <Avatar sx={{ bgcolor: 'grey.500', ml: 1, width: 32, height: 32 }}>
                    <Person fontSize="small" />
                </Avatar>
            )}
        </Box>
    );
};

export default MessageItem;