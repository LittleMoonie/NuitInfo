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
import CRUDModal from '@/Components/Admin/CRUDModal';

type Quiz = {
    id: number;
    title: string;
    user_creation: number;
    point: number;
    isvalidated: boolean;
};

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([
        { id: 1, title: 'Ocean Quiz', user_creation: 1, point: 20, isvalidated: true },
    ]);

    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const itemsPerPage = 5;

    const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
    const displayedQuizzes = filteredQuizzes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = quizzes.filter(
            (quiz) =>
                quiz.title.toLowerCase().includes(query) ||
                quiz.point.toString().includes(query)
        );
        setFilteredQuizzes(filtered);
        setCurrentPage(1);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const quiz: Quiz = {
            id: editingQuiz ? editingQuiz.id : Date.now(),
            title: formData.get('title') as string,
            user_creation: 1, // Replace with logged-in user ID
            point: parseInt(formData.get('point') as string, 10),
            isvalidated: formData.get('isvalidated') === 'true',
        };

        let updatedQuizzes;
        if (editingQuiz) {
            updatedQuizzes = quizzes.map((q) => (q.id === editingQuiz.id ? quiz : q));
        } else {
            updatedQuizzes = [...quizzes, quiz];
        }

        setQuizzes(updatedQuizzes);
        setFilteredQuizzes(updatedQuizzes);
        setModalOpen(false);
        setEditingQuiz(null);
    };

    const handleDelete = (id: number) => {
        const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
        setQuizzes(updatedQuizzes);
        setFilteredQuizzes(updatedQuizzes);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: 'gray.800' }}
                >
                    Quizzes
                </Typography>
            }
        >
            <Head title="Quizzes Management" />

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
                                Quizzes List
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
                                    Add Quiz
                                </Button>
                            </Box>
                        </Box>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Points</TableCell>
                                        <TableCell>Validated</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedQuizzes.map((quiz) => (
                                        <TableRow key={quiz.id}>
                                            <TableCell>{quiz.title}</TableCell>
                                            <TableCell>{quiz.point}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={quiz.isvalidated}
                                                    disabled
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditingQuiz(quiz);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(quiz.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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

            <CRUDModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingQuiz(null);
                }}
                title={editingQuiz ? 'Edit Quiz' : 'Add Quiz'}
                onSubmit={handleSave}
            >
                <TextField
                    name="title"
                    label="Title"
                    defaultValue={editingQuiz?.title || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="point"
                    label="Points"
                    type="number"
                    defaultValue={editingQuiz?.point || ''}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="isvalidated"
                            defaultChecked={editingQuiz?.isvalidated || false}
                            color="success"
                        />
                    }
                    label="Validated"
                />
            </CRUDModal>
        </AuthenticatedLayout>
    );
}
