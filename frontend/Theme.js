// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `'Inter', sans-serif`,
        fontWeightLight: 100,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

export default theme;