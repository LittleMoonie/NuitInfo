import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from '@/Components/Navbar';

export default function Explore() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#1f6fb2',
                background: 'linear-gradient(to bottom, #3a9ed9 0%, #1f6fb2 100%)',
            }}
        >
            <Navbar />
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
                        Explore the Depths
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
                        Dive into an interactive journey revealing the ocean’s hidden wonders.
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
                        Our exploration tools let you navigate through layers of marine ecosystems,
                        discover how temperature and salinity impact currents, or understand how climate change
                        alters ocean chemistry. Engage with maps, diagrams, and interactive modules that bring
                        complex processes to life, making it easier to understand why protecting the ocean
                        protects all life on Earth.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
