import React from 'react';
import { Container, Typography } from '@mui/material';
import NavBar from '../../Components/Navbar';


const Act: React.FC = () => {
    return (
        <>
            <NavBar />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Act
                </Typography>
                <Typography variant="body1">
                    Learn how you can make a positive impact. From personal lifestyle changes
                    to community projects, discover ways to protect our oceans and ourselves.
                </Typography>
            </Container>
        </>
    );
};

export default Act;
