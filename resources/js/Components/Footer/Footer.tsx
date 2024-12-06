import React from 'react';
import { Box, Grid, Typography, Link as MUILink } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                width: '100%',
                bgcolor: '#FFB266',
                borderTopLeftRadius: '40px',
                borderTopRightRadius: '40px',
                overflow: 'hidden',
                mt: 4,
            }}
        >
            {/* Main Footer Section */}
            <Box sx={{ width: '85%', maxWidth: 1200, mx: 'auto', py: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <Grid container spacing={4} alignItems="flex-start" justifyContent="space-between">
                    {/* Branding and Share */}
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                color: '#333',
                                mb: 1
                            }}
                        >
                            Echos Of Life
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#333',
                                lineHeight: 1.4,
                            }}
                        >
                            Illustrating the vital parallels between the Ocean and the Human Body to inspire understanding and action.
                        </Typography>
                    </Grid>

                    {/* Column: About */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                mb: 1,
                                color: '#333'
                            }}
                        >
                            About
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/about"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Our Mission
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/parallels"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Discover the Parallels
                                </MUILink>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Column: Explore */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                mb: 1,
                                color: '#333'
                            }}
                        >
                            Explore
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="#quiz"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Learn
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/share"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Share
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/act"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Act
                                </MUILink>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Column: More */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                mb: 1,
                                color: '#333'
                            }}
                        >
                            More
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/resources"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Resources
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/contact"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Contact
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/support"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Support Us
                                </MUILink>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Column: Policies */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                mb: 1,
                                color: '#333'
                            }}
                        >
                            Policies
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/privacy-policy"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Privacy Policy
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/terms-of-use"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Terms of Use
                                </MUILink>
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                                <MUILink
                                    href="/confidentiality"
                                    underline="hover"
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Confidentiality
                                </MUILink>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ pt: 3, textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            color: '#333',
                            fontSize: '0.8rem'
                        }}
                    >
                        © {new Date().getFullYear()} Echos Of Life. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
