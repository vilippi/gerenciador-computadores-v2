
import {
    Box,
    Paper,
    Typography,
    Avatar,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import ReactMarkdown from 'react-markdown';

const MessageItem = ({ message }) => {
    const { text, isAI, images } = message;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isAI ? 'flex-start' : 'flex-end',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isAI ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    maxWidth: '75%',
                }}
            >
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: isAI ? 'primary.main' : 'grey.500',
                    }}
                >
                    {isAI ? <TipsAndUpdatesOutlinedIcon fontSize="small" /> : <Person fontSize="small" />}
                </Avatar>
                
                <Paper
                    sx={{
                        p: 1.5,
                        backgroundColor: isAI ? 'grey.100' : 'primary.main',
                        color: isAI ? 'text.primary' : 'primary.contrastText',
                        borderRadius: 2,
                        maxWidth: '100%',
                        ...(isAI && {
                            backgroundColor: 'grey.100',
                            ...(document.documentElement.getAttribute('data-theme') === 'dark' && {
                                backgroundColor: 'grey.800',
                            }),
                        }),
                    }}
                >
                    {images && images.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                            {images.map((image, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={image}
                                    sx={{
                                        maxWidth: '200px',
                                        maxHeight: '200px',
                                        borderRadius: 1,
                                        mb: 1,
                                        display: 'block',
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                </Paper>
            </Box>
        </Box>
    );
};

export default MessageItem;