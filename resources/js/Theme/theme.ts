import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#012D5E', // Deep Ocean Blue or your chosen primary color
        },
        secondary: {
            main: '#FFB266', // Golden Sand
        },
        // Add other palette options as needed
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Body font
        h1: {
            fontFamily: 'Montserrat, sans-serif', // For headlines
        },
    },
});

export default theme;
