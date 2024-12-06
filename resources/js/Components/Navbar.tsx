import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Drawer,
    List,
    ListItemButton,
    Link as MUILink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        { label: "About", href: "/about" },
        { label: "Parallels", href: "/parallels" },
        { label: "Explore", href: "/explore" },
        { label: "Resources", href: "/resources" },
        { label: "Contact", href: "/contact" },
        { label: "Sign In", href: "/signin" },
    ];

    // Drawer for mobile view
    const drawer = (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                borderRight: '1px solid rgba(255,255,255,0.3)',
                p: 2,
            }}
        >
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {navLinks.map((link) => (
                    <ListItemButton key={link.label} component="a" href={link.href} sx={{ p: 0 }}>
                        <MUILink
                            href={link.href}
                            underline="hover"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '0.9rem',
                                '&:hover': { color: '#f0f0f0' },
                                width: '100%',
                            }}
                        >
                            {link.label}
                        </MUILink>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="static" // or "relative" to let it scroll away
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    mt: 2,
                    width: '80%',
                    margin: '0 auto',
                    borderRadius: '8px',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Brand / Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                        }}
                    >
                        Echos of Life
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        {navLinks.map((link) => (
                            <MUILink
                                key={link.label}
                                href={link.href}
                                underline="hover"
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

                    {/* Mobile Menu Button */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'none',
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}
