import React, { PropsWithChildren } from 'react';
import { AppBar, Toolbar, Typography, Box, Link as MUILink, Paper } from '@mui/material';
import { Link as InertiaLink } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }: PropsWithChildren) {
    const navLinks = [
        { label: "About", href: "/about" },
        { label: "Parallels", href: "/parallels" },
        { label: "Explore", href: "/explore" },
        { label: "Resources", href: "/resources" },
        { label: "Contact", href: "/contact" },
        { label: "Share", href: "/share" },
        { label: "Act", href: "/act" },
        { label: "Support Us", href: "/support" },
        { label: "Privacy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms-of-use" },
        { label: "Confidentiality", href: "/confidentiality" },
        { label: "Sign In", href: "/signin" },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: '#f7f7f7',
                pt: 2,
            }}
        >
            {/* Top Navigation Bar */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    width: { xs: '90%', md: '80%' },
                    margin: '0 auto',
                    borderRadius: '8px',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Brand Logo and Name */}
                    <MUILink
                        component={InertiaLink}
                        href="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none'
                        }}
                    >
                        <ApplicationLogo style={{ width: 40, height: 40, fill: '#ffffff' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                ml: 1,
                                color: 'white',
                                fontWeight: 'bold',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                            }}
                        >
                            Echos of Life
                        </Typography>
                    </MUILink>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        {navLinks.map((link) => (
                            <MUILink
                                component={InertiaLink}
                                href={link.href}
                                underline="hover"
                                key={link.label}
                                sx={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '0.9rem',
                                    '&:hover': { color: '#f0f0f0' },
                                }}
                            >
                                {link.label}
                            </MUILink>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content Section */}
            <Box
                sx={{
                    mt: 6,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        p: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </Box>
    );
}
