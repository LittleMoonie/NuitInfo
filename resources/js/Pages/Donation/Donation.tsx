import React, { useState } from 'react';
import { Box, Typography, Container, Stack, TextField, Button } from '@mui/material';
import NavBar from '@/Components/Navbar'; // Adjust the import path as needed

export default function Donation() {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleDonate = () => {
        // Placeholder donation handler
        alert(`Thank you for your donation of $${amount}!`);
    };

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
            <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
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
                        Make a Donation
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
                        Every contribution helps us further our mission and create a healthier future
                        for our oceans and ourselves.
                    </Typography>

                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                            }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                            }}
                        />
                        <TextField
                            label="Donation Amount (USD)"
                            variant="outlined"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                            }}
                            type="number"
                            inputProps={{ min: '1', step: '0.01' }}
                        />
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDonate}
                            sx={{
                                textTransform: 'none',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                px: 3,
                                py: 1
                            }}
                        >
                            Donate
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
