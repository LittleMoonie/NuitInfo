import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Box,
    Typography,
    Paper,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    CardActions,
    Avatar,
} from '@mui/material';
import { Quiz, BarChart, WbSunny, Person } from '@mui/icons-material';

type Props = {
    auth: {
        user: {
            name: string;
            score: number;
        };
    };
    facts: string[];
};

export default function Dashboard({ auth, facts }: Props) {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'gray.800' }}>
                    Dashboard
                </Typography>
            }
        >
            <Head title="Dashboard" />

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Welcome Card */}
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                                <Typography variant="h4" color="primary" gutterBottom>
                                    Welcome, {auth.user.name}!
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Dive into the ocean of knowledge and discover the connections between
                                    human and ocean systems.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* User Profile Summary */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                                        <Person fontSize="large" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6">{auth.user.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Score: {auth.user.score}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Educational Highlight */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6" color="primary">
                                        Did You Know?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {randomFact}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
