import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button,
    Switch,
    IconButton,
    Pagination,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";

interface Quiz {
    id: number;
    title: string;
    point: number;
    isvalidated: number; // API returns 0 or 1 (instead of boolean)
}

const QuizManager: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [displayedQuizzes, setDisplayedQuizzes] = useState<Quiz[]>([]);
    const [quizPage, setQuizPage] = useState(1);
    const [totalQuizPages, setTotalQuizPages] = useState(1); // Assuming pagination data is not available, we start with 1
    const [searchTerm, setSearchTerm] = useState('');
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

    // Fetch quizzes on component mount
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('/api/admin/quiz-manager/');
                setQuizzes(response.data); // Assuming the API returns an array of quizzes
                setTotalQuizPages(1); // Set to 1, assuming we don't have pagination info from the API
            } catch (error) {
                console.error('Failed to fetch quizzes', error);
            }
        };

        fetchQuizzes();
    }, []);

    // Handle search input change
    const handleSearchQuizzes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);
        const filteredQuizzes = quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedQuizzes(filteredQuizzes);
    };

    // Pagination handler
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setQuizPage(value);
    };

    // Handle quiz deletion
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/admin/quiz-manager/${id}`);
            setQuizzes(quizzes.filter(quiz => quiz.id !== id));
        } catch (error) {
            console.error('Failed to delete quiz', error);
        }
    };

    // Handle adding/editing quizzes (modal open logic)
    const handleAddQuiz = () => {
        setQuizModalOpen(true);
        setEditingQuiz(null);
    };

    // Update displayed quizzes for the current page
    useEffect(() => {
        const startIndex = (quizPage - 1) * 10;
        const endIndex = startIndex + 10;
        setDisplayedQuizzes(quizzes.slice(startIndex, endIndex));
    }, [quizPage, quizzes]);

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
                                    value={searchTerm}
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
                                    onClick={handleAddQuiz}
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
                                    {displayedQuizzes.map(quiz => (
                                        <TableRow key={quiz.id}>
                                            <TableCell>{quiz.title}</TableCell>
                                            <TableCell>{quiz.point}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={quiz.isvalidated === 1}
                                                    disabled
                                                    color="success"
                                                />
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
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
};

export default QuizManager;
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Box,
//     Container,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     TextField,
//     Button,
//     Switch,
//     IconButton,
//     Pagination,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     SelectChangeEvent,
// } from '@mui/material';
// import { Add, Edit, Delete, Search } from '@mui/icons-material';
//
// // Définir le type Quiz pour l'utilisation des données
// type Quiz = {
//     id: number;
//     title: string;
//     user_creation: number;
//     point: number;
//     isvalidated: number;
//     created_at: string;
//     updated_at: string | null;
// };
//
// const QuizManager: React.FC = () => {
//     const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//     const [quizPage, setQuizPage] = useState(1);
//     const [totalQuizPages, setTotalQuizPages] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [quizModalOpen, setQuizModalOpen] = useState(false);
//     const [newQuiz, setNewQuiz] = useState({
//         title: '',
//         user_creation: 1, // Ex: ID de l'utilisateur, à ajuster en fonction de ton application
//         point: 0,
//         isvalidated: 0, // 0 pour false, 1 pour true
//     });
//
//     // Charger les quiz existants au chargement du composant
//     useEffect(() => {
//         const fetchQuizzes = async () => {
//             try {
//                 const response = await axios.get('/api/admin/quiz-manager');
//                 setQuizzes(response.data);
//                 setTotalQuizPages(Math.ceil(response.data.length / 10)); // Exemple de pagination, à ajuster
//             } catch (error) {
//                 console.error('Failed to fetch quizzes:', error);
//             }
//         };
//
//         fetchQuizzes();
//     }, []);
//
//     // Gérer les changements d'entrée (textuel ou numérique)
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewQuiz((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     // Gérer le changement pour la sélection (ex: isvalidated)
//     const handleSelectChange = (e: SelectChangeEvent<number>) => {
//         const { name, value } = e.target;
//         setNewQuiz((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     const handleCreateQuiz = async () => {
//         try {
//             const response = await axios.post('/api/admin/quiz-manager', newQuiz);
//             setQuizzes((prevQuizzes) => [...prevQuizzes, response.data]);
//             setQuizModalOpen(false);
//             setNewQuiz({ title: '', user_creation: 4, point: 0, isvalidated: 0 });
//         } catch (error) {
//             console.error('Failed to create quiz', error);
//         }
//     };
//
//     return (
//         <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
//             <Container maxWidth="lg">
//                 <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="h6">Quizzes List</Typography>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<Add />}
//                             onClick={() => setQuizModalOpen(true)}
//                         >
//                             Add Quiz
//                         </Button>
//                     </Box>
//
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Title</TableCell>
//                                     <TableCell>Points</TableCell>
//                                     <TableCell>Validated</TableCell>
//                                     <TableCell align="right">Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {quizzes.map((quiz) => (
//                                     <TableRow key={quiz.id}>
//                                         <TableCell>{quiz.title}</TableCell>
//                                         <TableCell>{quiz.point}</TableCell>
//                                         <TableCell>
//                                             <Switch checked={quiz.isvalidated === 1} disabled color="success" />
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             <IconButton color="primary">
//                                                 <Edit />
//                                             </IconButton>
//                                             <IconButton color="error">
//                                                 <Delete />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//
//                     {/* Pagination */}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                         <Pagination
//                             count={totalQuizPages}
//                             page={quizPage}
//                             onChange={(e, page) => setQuizPage(page)}
//                             color="primary"
//                         />
//                     </Box>
//
//                     {/* Modal pour créer un quiz */}
//                     <Dialog open={quizModalOpen} onClose={() => setQuizModalOpen(false)}>
//                         <DialogTitle>Create a New Quiz</DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 label="Title"
//                                 name="title"
//                                 value={newQuiz.title}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 margin="normal"
//                             />
//                             <TextField
//                                 label="Points"
//                                 name="point"
//                                 type="number"
//                                 value={newQuiz.point}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 margin="normal"
//                             />
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Validated</InputLabel>
//                                 <Select
//                                     name="isvalidated"
//                                     value={newQuiz.isvalidated}
//                                     onChange={handleSelectChange}
//                                 >
//                                     <MenuItem value={0}>No</MenuItem>
//                                     <MenuItem value={1}>Yes</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setQuizModalOpen(false)} color="secondary">
//                                 Cancel
//                             </Button>
//                             <Button onClick={handleCreateQuiz} color="primary">
//                                 Create Quiz
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             </Container>
//         </Box>
//     );
// };
//
// export default QuizManager;
