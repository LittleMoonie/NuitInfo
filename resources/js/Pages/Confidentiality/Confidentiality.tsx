import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import NavBar from '@/Components/Navbar'; // Adjust the import path based on your project structure

const Confidentiality: React.FC = () => {
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
                        Confidentiality
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
                        We are committed to maintaining the confidentiality of your information. This page details our promises and procedures for keeping your data secure.
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
                        Your trust is our priority. We implement strict access controls, robust encryption, and secure storage solutions to protect your personal and sensitive data. We limit data access to authorized personnel only, and we routinely audit our systems and processes to ensure they meet industry standards. Should any breach or security concern arise, we commit to promptly notify affected users and take all necessary steps to mitigate potential harm.
                        <br /><br />
                        Additionally, we continuously review and update our confidentiality policies, providing transparency about how your data is handled, stored, and safeguarded. We encourage you to review these policies regularly and reach out if you have any questions or concerns. By working together, we can maintain a safe, trustworthy environment that respects and protects your personal information.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Confidentiality;
