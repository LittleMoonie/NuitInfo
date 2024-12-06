import React from 'react';
import { Box, Grid, Typography, Link as MUILink } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                bgcolor: '#FFB266', // Golden Sand or Coral Orange
                pt: 1,   // Reduced from 2
                pb: 2,   // Reduced from 4
                borderTopLeftRadius: '40px',
                borderTopRightRadius: '40px',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ width: '80%', maxWidth: 1200, position: 'relative' }}>
                <Grid container spacing={1} alignItems="flex-start">
                    {/* Branding / Project Title Section */}
                    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '1rem', md: '1.2rem' }, // slightly smaller text
                                color: '#333',
                                backgroundColor: '#eee',
                                p: '2px 8px', // smaller padding around the brand text
                                borderRadius: '8px',
                                display: 'inline-block',
                            }}
                        >
                            Echos Of Life
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#333',
                                maxWidth: '250px',
                                lineHeight: 1.3, // slightly tighter line spacing
                            }}
                        >
                            Illustrating the vital parallels between the Ocean and the Human Body to inspire understanding and action.
                        </Typography>
                    </Grid>

                    {/* Links Section */}
                    <Grid
                        item
                        xs={12}
                        md={9}
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-end' },
                            flexWrap: 'wrap',
                            gap: { xs: 1.5, md: 3 }, // reduced gaps
                        }}
                    >
                        {/* Column 1 */}
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 600,
                                    mb: 0.25, // reduced from 0.5
                                    color: '#333'
                                }}
                            >
                                About
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem', // smaller link text
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Our Mission
                                    </MUILink>
                                </Box>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Discover the Parallels
                                    </MUILink>
                                </Box>
                            </Box>
                        </Box>

                        {/* Column 2 */}
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 600,
                                    mb: 0.25,
                                    color: '#333'
                                }}
                            >
                                Explore
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Learn
                                    </MUILink>
                                </Box>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Share
                                    </MUILink>
                                </Box>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Act
                                    </MUILink>
                                </Box>
                            </Box>
                        </Box>

                        {/* Column 3 */}
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 600,
                                    mb: 0.25,
                                    color: '#333'
                                }}
                            >
                                More
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Resources
                                    </MUILink>
                                </Box>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Contact
                                    </MUILink>
                                </Box>
                                <Box component="li" sx={{ mb: 0.25 }}>
                                    <MUILink
                                        href="#"
                                        underline="hover"
                                        sx={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Support Us
                                    </MUILink>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
