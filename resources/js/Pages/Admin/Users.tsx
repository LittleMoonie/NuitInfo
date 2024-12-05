import React, { useState } from 'react';
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

type User = {
    id: number;
    nom: string;
    prenom: string;
    birthday: string;
    email: string;
    role: number;
    isDeleted: boolean;
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            nom: 'Doe',
            prenom: 'John',
            birthday: '1990-01-01',
            email: 'john.doe@example.com',
            role: 1,
            isDeleted: false,
        },
    ]);

    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const itemsPerPage = 2;

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to refresh the filtered users after any change
    const refreshFilteredUsers = () => {
        setFilteredUsers([...users]);
        setCurrentPage(1); // Reset to the first page after any update
    };

    // Search Function
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user.nom.toLowerCase().includes(query) ||
                user.prenom.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toString().includes(query)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    // Add or Update User
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user: User = {
            id: editingUser ? editingUser.id : Date.now(),
            nom: formData.get('nom') as string,
            prenom: formData.get('prenom') as string,
            birthday: formData.get('birthday') as string,
            email: formData.get('email') as string,
            role: parseInt(formData.get('role') as string, 10),
            isDeleted: formData.get('isDeleted') === 'true',
        };

        let updatedUsers;
        if (editingUser) {
            // Update existing user
            updatedUsers = users.map((u) => (u.id === editingUser.id ? user : u));
        } else {
            // Add new user
            updatedUsers = [...users, user];
        }

        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers); // Update filtered users at the same time
        setModalOpen(false);
        setEditingUser(null);
    };

    // Delete User
    const handleDelete = (id: number) => {
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, isDeleted: true } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers); // Update filtered users at the same time
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: 'gray.800' }}
                >
                    Users
                </Typography>
            }
        >
            <Head title="Users Management" />

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
                        {/* Header with Search and Add */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6" color="text.primary">
                                Users List
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search..."
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
                                    Add User
                                </Button>
                            </Box>
                        </Box>

                        {/* Users Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Birthday</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Deleted</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.nom}</TableCell>
                                            <TableCell>{user.prenom}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.birthday}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={user.isDeleted}
                                                    disabled
                                                    color="error"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditingUser(user);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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

            {/* Modal for Add/Edit */}
            <CRUDModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingUser(null);
                }}
                title={editingUser ? 'Edit User' : 'Add User'}
                onSubmit={handleSave}
            >
                <TextField
                    name="nom"
                    label="Nom"
                    defaultValue={editingUser?.nom || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="prenom"
                    label="Prénom"
                    defaultValue={editingUser?.prenom || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="Email"
                    defaultValue={editingUser?.email || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="birthday"
                    label="Birthday"
                    type="date"
                    defaultValue={editingUser?.birthday || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="role"
                    label="Role"
                    type="number"
                    defaultValue={editingUser?.role || ''}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="isDeleted"
                            defaultChecked={editingUser?.isDeleted || false}
                            color="error"
                        />
                    }
                    label="Is Deleted"
                />
            </CRUDModal>
        </AuthenticatedLayout>
    );
}

