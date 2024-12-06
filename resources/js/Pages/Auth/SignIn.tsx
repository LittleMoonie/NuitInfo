import React, { useState, FormEvent } from 'react';
import {
    Box,
    Typography,
    Container,
    Stack,
    TextField,
    Button,
    Link as MUILink,
    FormControlLabel,
    Checkbox,
    Tabs,
    Tab,
} from '@mui/material';
import Navbar from '@/Components/Navbar';
import { Head, Link, useForm } from '@inertiajs/react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            style={{ width: '100%' }}
        >
            {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
        </div>
    );
}

export default function SignIn({ status, canResetPassword }: { status?: string; canResetPassword?: boolean; }) {
    const [value, setValue] = useState(0); // 0: Sign In, 1: Register, 2: Forgot Password

    // Sign In form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Register form (adapted from your logic)
    const registerForm = useForm({
        name: '',
        prenom: '',
        email: '',
        birthday: '',
        password: '',
        password_confirmation: '',
    });

    // Forgot Password form
    const forgotForm = useForm({
        email: '',
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const submitLogin = (e: FormEvent) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const submitRegister = (e: FormEvent) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    const submitForgot = (e: FormEvent) => {
        e.preventDefault();
        forgotForm.post(route('password.email'));
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
            <Head title="Sign In" />
            <Navbar />

            <Container maxWidth="xs" sx={{ py: { xs: 4, md: 8 } }}>
                <Stack spacing={3}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            textAlign: 'center',
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                        }}
                    >
                        Welcome
                    </Typography>

                    {status && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'green',
                                textAlign: 'center',
                                fontFamily: 'Roboto, sans-serif',
                            }}
                        >
                            {status}
                        </Typography>
                    )}

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} centered textColor="inherit">
                            <Tab label="Sign In" sx={{ color: '#fff', fontFamily: 'Roboto, sans-serif' }} />
                            <Tab label="Register" sx={{ color: '#fff', fontFamily: 'Roboto, sans-serif' }} />
                            <Tab label="Forgot Password" sx={{ color: '#fff', fontFamily: 'Roboto, sans-serif' }} />
                        </Tabs>
                    </Box>

                    {/* Sign In Panel */}
                    <TabPanel value={value} index={0}>
                        <Stack component="form" onSubmit={submitLogin} spacing={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                type="email"
                                value={loginForm.data.email}
                                onChange={(e) => loginForm.setData('email', e.target.value)}
                                error={!!loginForm.errors.email}
                                helperText={loginForm.errors.email}
                                InputLabelProps={{ style: { color: '#333' } }}
                                autoComplete="username"
                                autoFocus
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
                                type="password"
                                value={loginForm.data.password}
                                onChange={(e) => loginForm.setData('password', e.target.value)}
                                error={!!loginForm.errors.password}
                                helperText={loginForm.errors.password}
                                InputLabelProps={{ style: { color: '#333' } }}
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={loginForm.data.remember}
                                        onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                        sx={{ color: '#fff' }}
                                    />
                                }
                                label={
                                    <Typography sx={{ color: '#f0f0f0', fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem' }}>
                                        Remember me
                                    </Typography>
                                }
                            />

                            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                                {canResetPassword && (
                                    <MUILink
                                        component={Link}
                                        href={route('password.request')}
                                        underline="hover"
                                        sx={{
                                            color: '#fff',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '0.85rem',
                                            '&:hover': { color: '#f0f0f0' },
                                        }}
                                    >
                                        Forgot your password?
                                    </MUILink>
                                )}
                                <Button type="submit" variant="contained" color="primary" disabled={loginForm.processing}>
                                    Log in
                                </Button>
                            </Stack>
                        </Stack>
                    </TabPanel>

                    {/* Register Panel (Adapted) */}
                    <TabPanel value={value} index={1}>
                        <Stack component="form" onSubmit={submitRegister} spacing={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nom"
                                value={registerForm.data.name}
                                onChange={(e) => registerForm.setData('name', e.target.value)}
                                error={!!registerForm.errors.name}
                                helperText={registerForm.errors.name}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                                autoFocus
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Prénom"
                                value={registerForm.data.prenom}
                                onChange={(e) => registerForm.setData('prenom', e.target.value)}
                                error={!!registerForm.errors.prenom}
                                helperText={registerForm.errors.prenom}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                type="email"
                                value={registerForm.data.email}
                                onChange={(e) => registerForm.setData('email', e.target.value)}
                                error={!!registerForm.errors.email}
                                helperText={registerForm.errors.email}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Date de naissance"
                                type="date"
                                value={registerForm.data.birthday}
                                onChange={(e) => registerForm.setData('birthday', e.target.value)}
                                error={!!registerForm.errors.birthday}
                                helperText={registerForm.errors.birthday}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                                InputProps={{
                                    inputProps: {
                                        max: new Date().toISOString().split("T")[0], // Optional: prevent future dates
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Mot de passe"
                                type="password"
                                value={registerForm.data.password}
                                onChange={(e) => registerForm.setData('password', e.target.value)}
                                error={!!registerForm.errors.password}
                                helperText={registerForm.errors.password}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                                autoComplete="new-password"
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Confirmer le mot de passe"
                                type="password"
                                value={registerForm.data.password_confirmation}
                                onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                error={!!registerForm.errors.password_confirmation}
                                helperText={registerForm.errors.password_confirmation}
                                InputLabelProps={{ style: { color: '#333' } }}
                                required
                                autoComplete="new-password"
                            />

                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                <MUILink
                                    component={Link}
                                    href={route('login')}
                                    underline="hover"
                                    sx={{
                                        color: '#fff',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '0.85rem',
                                        '&:hover': { color: '#f0f0f0' },
                                    }}
                                >
                                    Déjà enregistré ?
                                </MUILink>
                                <Button type="submit" variant="contained" color="primary" disabled={registerForm.processing}>
                                    S'inscrire
                                </Button>
                            </Stack>
                        </Stack>
                    </TabPanel>

                    {/* Forgot Password Panel */}
                    <TabPanel value={value} index={2}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#f0f0f0',
                                fontFamily: 'Roboto, sans-serif',
                                textAlign: 'center',
                                lineHeight: 1.6,
                                mb: 2,
                            }}
                        >
                            Forgot your password? No problem. Enter your email and we’ll send you a reset link.
                        </Typography>

                        {status && (
                            <Typography variant="body2" sx={{ color: 'green', textAlign: 'center', fontFamily: 'Roboto, sans-serif', mb: 2 }}>
                                {status}
                            </Typography>
                        )}

                        <Stack component="form" onSubmit={submitForgot} spacing={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                type="email"
                                value={forgotForm.data.email}
                                onChange={(e) => forgotForm.setData('email', e.target.value)}
                                error={!!forgotForm.errors.email}
                                helperText={forgotForm.errors.email}
                                InputLabelProps={{ style: { color: '#333' } }}
                                autoFocus
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" color="primary" disabled={forgotForm.processing}>
                                    Email Password Reset Link
                                </Button>
                            </Box>
                        </Stack>
                    </TabPanel>
                </Stack>
            </Container>
        </Box>
    );
}
