// Importation des modules et bibliothèques nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Box,
    Typography,
    Paper,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    TextField,
    Pagination,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import CRUDModal from "@/Components/Admin/CRUDModal";

// Définition des types pour les entrées du tableau des scores
type LeaderboardEntry = {
    id: number;
    user_id: number;
    total_score: number;
};

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

// Définition du composant Leaderboard
export default function Leaderboard({ users = [] }: { users: User[] }) {
    // États locaux
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [filteredLeaderboard, setFilteredLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [editingEntry, setEditingEntry] = useState<LeaderboardEntry | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    // Configuration de la pagination
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredLeaderboard.length / itemsPerPage);
    const displayedLeaderboard = filteredLeaderboard.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fonction pour récupérer les données du tableau des scores via une requête API
    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('/admin/leaderboard');
            setLeaderboard(response.data);
            setFilteredLeaderboard(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération du tableau des scores :', error);
        }
    };

    // Effet pour récupérer les données au montage du composant
    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Fonction de recherche
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = leaderboard.filter(
            (entry) =>
                users.find((user) => user.id === entry.user_id)?.name.toLowerCase().includes(query)
        );
        setFilteredLeaderboard(filtered);
        setCurrentPage(1);
    };

    // Ajout ou mise à jour d'une entrée du tableau des scores
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const entry: LeaderboardEntry = {
            id: editingEntry ? editingEntry.id : Date.now(),
            user_id: parseInt(formData.get('user_id') as string, 10),
            total_score: parseInt(formData.get('total_score') as string, 10),
        };

        let updatedLeaderboard;
        if (editingEntry) {
            // Mise à jour
            updatedLeaderboard = leaderboard.map((e) => (e.id === editingEntry.id ? entry : e));
            try {
                await axios.put(`/admin/leaderboard/${editingEntry.id}`, entry);
            } catch (error) {
                console.error('Erreur lors de la mise à jour :', error);
            }
        } else {
            // Ajout
            updatedLeaderboard = [...leaderboard, entry];
            try {
                await axios.post('/admin/leaderboard', entry);
            } catch (error) {
                console.error('Erreur lors de l\'ajout :', error);
            }
        }

        setLeaderboard(updatedLeaderboard);
        setFilteredLeaderboard(updatedLeaderboard);
        setModalOpen(false);
        setEditingEntry(null);
    };

    // Suppression d'une entrée du tableau des scores
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/admin/leaderboard/${id}`);
            const updatedLeaderboard = leaderboard.filter((entry) => entry.id !== id);
            setLeaderboard(updatedLeaderboard);
            setFilteredLeaderboard(updatedLeaderboard);
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
        }
    };

    // Rendu du composant
    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: 'gray.800' }}
                >
                    Gestion du Tableau des Scores
                </Typography>
            }
        >
            <Head title="Leaderboard Management" />

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
                        {/* Barre de recherche et bouton d'ajout */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6" color="text.primary">
                                Tableau des Scores
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Recherche par utilisateur..."
                                    variant="outlined"
                                    size="small"
                                    onChange={handleSearch}
                                    InputProps={{
                                        startAdornment: <Search />,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={() => setModalOpen(true)}
                                >
                                    Ajouter une entrée
                                </Button>
                            </Box>
                        </Box>

                        {/* Tableau des scores */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Utilisateur</TableCell>
                                        <TableCell>Score Total</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedLeaderboard.length > 0 ? (
                                        displayedLeaderboard.map((entry) => (
                                            <TableRow key={entry.id}>
                                                <TableCell>
                                                    {
                                                        (users.find(
                                                            (user) => user.id === entry.user_id
                                                        ) || { name: 'Utilisateur inconnu' }).name
                                                    }
                                                </TableCell>
                                                <TableCell>{entry.total_score}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            setEditingEntry(entry);
                                                            setModalOpen(true);
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(entry.id)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                Aucune entrée trouvée.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Modale pour ajout/édition */}
            <CRUDModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingEntry(null);
                }}
                title={editingEntry ? 'Modifier une entrée' : 'Ajouter une entrée'}
                onSubmit={handleSave}
            >
                <TextField
                    name="user_id"
                    label="ID Utilisateur"
                    type="number"
                    defaultValue={editingEntry?.user_id || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="total_score"
                    label="Score Total"
                    type="number"
                    defaultValue={editingEntry?.total_score || ''}
                    fullWidth
                    margin="normal"
                />
            </CRUDModal>
        </AuthenticatedLayout>
    );
}
