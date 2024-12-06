import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from "@/Components/Navbar";

export default function About() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#1f6fb2',
                background: 'linear-gradient(to bottom, #3a9ed9 0%, #1f6fb2 100%)',
            }}
        >
            {/* Navigation Bar */}
            <Navbar />

            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Stack spacing={4}>
                    {/* Main Title */}
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
                        About Echos of Life
                    </Typography>

                    {/* Subheading */}
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
                        Understanding the Ocean as We Understand Ourselves
                    </Typography>

                    {/* Illustration or Image */}
                    <Box
                        component="img"
                        src="/assets/illustrations/ocean-human-connection.png"
                        alt="Ocean and Human Body Connection"
                        sx={{
                            width: '100%',
                            maxWidth: '400px',
                            mx: 'auto',
                            display: 'block',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }}
                    />

                    {/* Main Content */}
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
                        At <strong>Echos of Life</strong>, we believe the Ocean is more than just a body of water – it is a complex, life-sustaining system that mirrors the human body in remarkable ways. Just as our lungs exchange gases to sustain us, the Ocean’s phytoplankton produce most of the world’s oxygen. Just as our hearts pump blood through our veins, ocean currents circulate nutrients, heat, and life throughout the planet. By exploring these parallels, we deepen our understanding of both the human experience and the delicate ecosystems that surround us.
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
                        Our mission is to shine a light on these connections through an immersive, educational, and interactive experience. By highlighting the similarities between the Ocean’s ecosystems and our own bodily systems, we hope to foster a deeper appreciation for marine life and inspire a sense of responsibility to preserve and protect it. Understanding the Ocean’s role in regulating climate, supporting biodiversity, and storing carbon is not just an environmental concern – it’s a matter of preserving the intricate balance that sustains all life on Earth.
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
                        At Echos of Life, we’re committed to delivering engaging content, real-time explorations, and creative formats like podcasts and interactive media. We’re here to educate, inspire, and encourage action – because safeguarding the Ocean isn’t just about protecting a distant environment; it’s about preserving the life support system that makes our own existence possible.
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
                        Join us on this journey of discovery. Dive deeper into understanding the Ocean as if it were a human body, learn the critical parallels that bind us, and help us echo the call for change – for the Ocean, for humanity, and for the future.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
