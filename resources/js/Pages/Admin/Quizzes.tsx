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
import CRUDModal from '@/Components/Admin/CRUDModal';

type Quiz = {
    id: number;
    title: string;
    user_creation: number;
    point: number;
    isvalidated: boolean;
};

export default function Quizzes() {
    // State for quizzes, answers, and played quizzes
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [answers, setAnswers] = useState<any[]>([]); // Answers for each quiz
    const [playedQuizzes, setPlayedQuizzes] = useState<any[]>([]); // Quizzes that have been played

    // Filtered state for each table
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [filteredAnswers, setFilteredAnswers] = useState<any[]>([]);
    const [filteredPlayedQuizzes, setFilteredPlayedQuizzes] = useState<any[]>([]);

    // Editing state for the modals
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const [editingAnswer, setEditingAnswer] = useState<any | null>(null);
    const [editingPlayed, setEditingPlayed] = useState<any | null>(null);

    // Modal states
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [answerModalOpen, setAnswerModalOpen] = useState(false);
    const [playedModalOpen, setPlayedModalOpen] = useState(false);

    // Pagination states
    const [quizPage, setQuizPage] = useState(1);
    const [answerPage, setAnswerPage] = useState(1);
    const [playedPage, setPlayedPage] = useState(1);

    const itemsPerPage = 5;

    // Pagination calculations for each table
    const totalQuizPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
    const totalAnswerPages = Math.ceil(filteredAnswers.length / itemsPerPage);
    const totalPlayedPages = Math.ceil(filteredPlayedQuizzes.length / itemsPerPage);

    // Data to display for each table (after pagination)
    const displayedQuizzes = filteredQuizzes.slice(
        (quizPage - 1) * itemsPerPage,
        quizPage * itemsPerPage
    );
    const displayedAnswers = filteredAnswers.slice(
        (answerPage - 1) * itemsPerPage,
        answerPage * itemsPerPage
    );
    const displayedPlayedQuizzes = filteredPlayedQuizzes.slice(
        (playedPage - 1) * itemsPerPage,
        playedPage * itemsPerPage
    );

    // Fetch data from the server
    const fetchData = async () => {
        try {
            const quizResponse = await axios.get('/admin/quizzes');
            const answersResponse = await axios.get('/admin/quiz_answers');
            const playedQuizzesResponse = await axios.get('/admin/quiz_played');

            setQuizzes(quizResponse.data);
            setAnswers(answersResponse.data);
            setPlayedQuizzes(playedQuizzesResponse.data);

            setFilteredQuizzes(quizResponse.data);
            setFilteredAnswers(answersResponse.data);
            setFilteredPlayedQuizzes(playedQuizzesResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchQuizzes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = quizzes.filter(
            (quiz) =>
                quiz.title.toLowerCase().includes(query) ||
                quiz.point.toString().includes(query)
        );
        setFilteredQuizzes(filtered);
        setQuizPage(1);
    };

    const handleSearchAnswers = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = answers.filter(
            (answer) =>
                answer.description.toLowerCase().includes(query) ||
                answer.quiz_id.toString().includes(query)
        );
        setFilteredAnswers(filtered);
        setAnswerPage(1);
    };

    const handleSearchPlayedQuizzes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = playedQuizzes.filter(
            (played) =>
                played.quiz_id.toString().includes(query) ||
                played.user_id.toString().includes(query)
        );
        setFilteredPlayedQuizzes(filtered);
        setPlayedPage(1);
    };

    // Handle the save of new or edited data
    const handleSaveQuiz = (event: React.FormEvent<HTMLFormElement>) => {
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
        setQuizModalOpen(false);
        setEditingQuiz(null);
    };

    const handleSaveAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const answer = {
            id: editingAnswer ? editingAnswer.id : Date.now(),
            quiz_id: parseInt(formData.get('quiz_id') as string, 10),
            description: formData.get('description') as string,
            is_response: formData.get('is_response') === 'true',
        };
        let updatedAnswers;
        if (editingAnswer) {
            updatedAnswers = answers.map((ans) => (ans.id === editingAnswer.id ? answer : ans));
        } else {
            updatedAnswers = [...answers, answer];
        }
        setAnswers(updatedAnswers);
        setFilteredAnswers(updatedAnswers);
        setAnswerModalOpen(false);
        setEditingAnswer(null);
    };

    const handleSavePlayed = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const played = {
            id: editingPlayed ? editingPlayed.id : Date.now(),
            quiz_id: parseInt(formData.get('quiz_id') as string, 10),
            user_id: parseInt(formData.get('user_id') as string, 10),
            score: parseInt(formData.get('score') as string, 10),
        };
        let updatedPlayedQuizzes;
        if (editingPlayed) {
            updatedPlayedQuizzes = playedQuizzes.map((played) => (played.id === editingPlayed.id ? played : played));
        } else {
            updatedPlayedQuizzes = [...playedQuizzes, played];
        }
        setPlayedQuizzes(updatedPlayedQuizzes);
        setFilteredPlayedQuizzes(updatedPlayedQuizzes);
        setPlayedModalOpen(false);
        setEditingPlayed(null);
    };

    // Handle the delete action for any record
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
                    Quizzes Management
                </Typography>
            }
        >
            <Head title="Quizzes Management" />

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
                        {/* Quizzes Table */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Quizzes List</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search Quizzes..."
                                    variant="outlined"
                                    size="small"
                                    onChange={handleSearchQuizzes}
                                    InputProps={{
                                        startAdornment: <Search />,
                                    }}
                                    sx={{ width: 250 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={() => setQuizModalOpen(true)}
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
                                                <Switch checked={quiz.isvalidated} disabled color="success" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditingQuiz(quiz);
                                                        setQuizModalOpen(true);
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
                                count={totalQuizPages}
                                page={quizPage}
                                onChange={(e, page) => setQuizPage(page)}
                                color="primary"
                            />
                        </Box>

                        {/* Quiz Answers Table */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
                            <Typography variant="h6">Quiz Answers</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search Answers..."
                                    variant="outlined"
                                    size="small"
                                    onChange={handleSearchAnswers}
                                    InputProps={{
                                        startAdornment: <Search />,
                                    }}
                                    sx={{ width: 250 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={() => setAnswerModalOpen(true)}
                                >
                                    Add Answer
                                </Button>
                            </Box>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quiz ID</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Is Response</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedAnswers.map((answer) => (
                                        <TableRow key={answer.id}>
                                            <TableCell>{answer.quiz_id}</TableCell>
                                            <TableCell>{answer.description}</TableCell>
                                            <TableCell>{answer.is_response ? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalAnswerPages}
                                page={answerPage}
                                onChange={(e, page) => setAnswerPage(page)}
                                color="primary"
                            />
                        </Box>

                        {/* Played Quizzes Table */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
                            <Typography variant="h6">Played Quizzes</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search Played Quizzes..."
                                    variant="outlined"
                                    size="small"
                                    onChange={handleSearchPlayedQuizzes}
                                    InputProps={{
                                        startAdornment: <Search />,
                                    }}
                                    sx={{ width: 250 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={() => setPlayedModalOpen(true)}
                                >
                                    Add Played Quiz
                                </Button>
                            </Box>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quiz ID</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedPlayedQuizzes.map((played) => (
                                        <TableRow key={played.id}>
                                            <TableCell>{played.quiz_id}</TableCell>
                                            <TableCell>{played.user_id}</TableCell>
                                            <TableCell>{played.score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalPlayedPages}
                                page={playedPage}
                                onChange={(e, page) => setPlayedPage(page)}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Modal for Add/Edit Quiz */}
            <CRUDModal
                open={quizModalOpen}
                onClose={() => {
                    setQuizModalOpen(false);
                    setEditingQuiz(null);
                }}
                title={editingQuiz ? 'Edit Quiz' : 'Add Quiz'}
                onSubmit={handleSaveQuiz}
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

            {/* Modal for Add/Edit Answer */}
            <CRUDModal
                open={answerModalOpen}
                onClose={() => {
                    setAnswerModalOpen(false);
                    setEditingAnswer(null);
                }}
                title={editingAnswer ? 'Edit Answer' : 'Add Answer'}
                onSubmit={handleSaveAnswer}
            >
                <TextField
                    name="quiz_id"
                    label="Quiz ID"
                    type="number"
                    defaultValue={editingAnswer?.quiz_id || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="description"
                    label="Description"
                    defaultValue={editingAnswer?.description || ''}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="is_response"
                            defaultChecked={editingAnswer?.is_response || false}
                            color="success"
                        />
                    }
                    label="Correct Answer"
                />
            </CRUDModal>

            {/* Modal for Add/Edit Played Quiz */}
            <CRUDModal
                open={playedModalOpen}
                onClose={() => {
                    setPlayedModalOpen(false);
                    setEditingPlayed(null);
                }}
                title={editingPlayed ? 'Edit Played Quiz' : 'Add Played Quiz'}
                onSubmit={handleSavePlayed}
            >
                <TextField
                    name="quiz_id"
                    label="Quiz ID"
                    type="number"
                    defaultValue={editingPlayed?.quiz_id || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="user_id"
                    label="User ID"
                    type="number"
                    defaultValue={editingPlayed?.user_id || ''}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="score"
                    label="Score"
                    type="number"
                    defaultValue={editingPlayed?.score || ''}
                    fullWidth
                    margin="normal"
                />
            </CRUDModal>
        </AuthenticatedLayout>
    );
}
