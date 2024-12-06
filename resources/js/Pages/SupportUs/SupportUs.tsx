import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import NavBar from '@/Components/Navbar'; // Adjust the import path as needed

const SupportUs: React.FC = () => {
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
                        Support Us
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
                        Your support helps us continue our mission. Learn how your contributions
                        make a difference and consider making a donation or becoming a volunteer.
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
                        By contributing, you help fund research, educational programs, and outreach efforts
                        to raise awareness about the intricate ties between ocean health and human well-being.
                        Your donation can spark meaningful change, support conservation initiatives, and inspire
                        communities around the world to protect our shared blue planet.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="/donation" // Link to the Donation page
                            sx={{
                                textTransform: 'none',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                px: 3,
                                py: 1
                            }}
                        >
                            Donate Now
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default SupportUs;
