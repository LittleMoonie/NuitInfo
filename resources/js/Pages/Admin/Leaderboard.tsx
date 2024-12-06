import React, { useState, useEffect, FormEvent } from 'react';
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
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

import Modal from '@/Components/Modal';

type LeaderboardEntry = {
    id: number;
    user_id: number;
    total_score: number;
};

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export default function Leaderboard({ users = [] }: { users: User[] }) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [filteredLeaderboard, setFilteredLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [editingEntry, setEditingEntry] = useState<LeaderboardEntry | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredLeaderboard.length / itemsPerPage);
    const displayedLeaderboard = filteredLeaderboard.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('/admin/leaderboard');
            setLeaderboard(response.data);
            setFilteredLeaderboard(response.data);
        } catch (error) {
            console.error('Error while fetching leaderboard data:', error);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = leaderboard.filter((entry) => {
            const user = users.find((user) => user.id === entry.user_id);
            const fullName = user ? `${user.first_name} ${user.last_name}`.toLowerCase() : '';
            return fullName.includes(query);
        });
        setFilteredLeaderboard(filtered);
        setCurrentPage(1);
    };

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const entry: LeaderboardEntry = {
            id: editingEntry ? editingEntry.id : Date.now(),
            user_id: parseInt(formData.get('user_id') as string, 10),
            total_score: parseInt(formData.get('total_score') as string, 10),
        };

        let updatedLeaderboard;
        if (editingEntry) {
            updatedLeaderboard = leaderboard.map((e) => (e.id === editingEntry.id ? entry : e));
            try {
                await axios.put(`/admin/leaderboard/${editingEntry.id}`, entry);
            } catch (error) {
                console.error('Error while updating:', error);
            }
        } else {
            updatedLeaderboard = [...leaderboard, entry];
            try {
                await axios.post('/admin/leaderboard', entry);
            } catch (error) {
                console.error('Error while adding:', error);
            }
        }

        setLeaderboard(updatedLeaderboard);
        setFilteredLeaderboard(updatedLeaderboard);
        setModalOpen(false);
        setEditingEntry(null);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/admin/leaderboard/${id}`);
            const updatedLeaderboard = leaderboard.filter((entry) => entry.id !== id);
            setLeaderboard(updatedLeaderboard);
            setFilteredLeaderboard(updatedLeaderboard);
        } catch (error) {
            console.error('Error while deleting:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: 'gray.800' }}
                >
                    Leaderboard Management
                </Typography>
            }
        >
            <Head title="Leaderboard Management" />

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6" color="text.primary">
                                Leaderboard
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search by user..."
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
                                    Add Entry
                                </Button>
                            </Box>
                        </Box>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Total Score</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedLeaderboard.length > 0 ? (
                                        displayedLeaderboard.map((entry) => (
                                            <TableRow key={entry.id}>
                                                <TableCell>
                                                    {entry.user_name || 'Unknown User'}
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
                                                No entries found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

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

            {/* Modal for add/edit */}
            <Modal
                show={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingEntry(null);
                }}
            >
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {editingEntry ? 'Edit Entry' : 'Add Entry'}
                    </Typography>
                    <TextField
                        name="user_id"
                        label="User ID"
                        type="number"
                        defaultValue={editingEntry?.user_id || ''}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="total_score"
                        label="Total Score"
                        type="number"
                        defaultValue={editingEntry?.total_score || ''}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="text"
                            onClick={() => {
                                setModalOpen(false);
                                setEditingEntry(null);
                            }}
                            sx={{ mr: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editingEntry ? 'Save' : 'Add'}
                        </Button>
                    </Box>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
