import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from '@/Components/Navbar';

export default function Resources() {
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
                        Resources
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
                        Dive deeper with curated articles, guides, and multimedia.
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
                        Whether you’re a student, educator, or just curious, our resource library
                        offers scientific articles, infographics, podcasts, and videos. Learn about
                        ocean acidification, marine biodiversity, or climate mitigation strategies.
                        Empower yourself with knowledge and share it to inspire others to join us in
                        safeguarding our oceanic lifeline.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
