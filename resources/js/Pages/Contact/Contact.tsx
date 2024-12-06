import React from 'react';
import { Box, Typography, Container, Stack, TextField, Button } from '@mui/material';
import Navbar from '@/Components/Navbar';

export default function Contact() {
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
                        Contact Us
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            color: '#f0f0f0',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            textAlign: 'center',
                        }}
                    >
                        Have questions or want to collaborate? Send us a message and let’s make waves together.
                    </Typography>

                    <Stack spacing={2} component="form">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            InputLabelProps={{ style: { color: '#333' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            InputLabelProps={{ style: { color: '#333' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Message"
                            multiline
                            rows={4}
                            InputLabelProps={{ style: { color: '#333' } }}
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2, alignSelf: 'flex-end' }}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
