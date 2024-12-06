import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import NavBar from '@/Components/Navbar'; // Adjust the import path based on your project structure

const Share: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#1f6fb2',
                background: 'linear-gradient(to bottom, #3a9ed9 0%, #1f6fb2 100%)',
            }}
        >
            <NavBar />
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Stack spacing={4}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            textAlign: 'center',
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}
                    >
                        Share
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#eee',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.4,
                        }}
                    >
                        Spread the word about the vital parallels between the ocean and our bodies.
                        Empower others to learn, understand, and take meaningful action.
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            color: '#f0f0f0',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            textAlign: 'justify',
                        }}
                    >
                        By sharing this knowledge, you become part of a global movement striving to
                        protect our oceans and ensure a healthier future for all. Whether it’s posting
                        articles on social media, hosting a community event, or discussing these topics
                        with friends and family, every action helps create a ripple effect. Let’s amplify
                        the message, foster dialogue, and motivate collective action to safeguard the
                        oceanic lifeline we all depend on.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Share;
