import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DOMPurify from 'dompurify';
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
    Tooltip,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import CRUDModal from '@/Components/Admin/CRUDModal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type Post = {
    id: number;
    title: string;
    content: string; // Rich text content
    poster: string;
    postedDate: string;
};

type Props = {
    auth: {
        user: {
            name: string;
            score: number;
        };
    };
    facts: string[];
};

export default function Posts({auth}: Props) {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            title: 'The Beauty of Oceans',
            content: '<p>Oceans are 🌊 vital for our planet!</p>',
            poster: 'Admin',
            postedDate: '2024-01-01',
        },
    ]);

    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emojiPickerPosition, setEmojiPickerPosition] = useState<{ top: number; left: number }>(
        { top: 0, left: 0 }
    );

    const emojiButtonRef = useRef<HTMLButtonElement | null>(null);

    const itemsPerPage = 5;

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const displayedPosts = filteredPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(query) ||
                post.poster.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
        setCurrentPage(1);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const content = editingPost?.content || ''; // Directly use content as-is.

        if (!title || !content) {
            console.error('Title or content is missing.');
            return;
        }

        const newPost: Post = {
            id: editingPost ? editingPost.id : Date.now(),
            title,
            content, // Save content without escaping
            poster: auth.user.name,
            postedDate: new Date().toISOString().split('T')[0],
        };

        const updatedPosts = editingPost
            ? posts.map((post) => (post.id === editingPost.id ? newPost : post))
            : [...posts, newPost];

        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setModalOpen(false);
        setEditingPost(null);
    };

    const handleDelete = (id: number) => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        if (editingPost) {
            const updatedContent = editingPost.content + emojiData.emoji;
            setEditingPost({ ...editingPost, content: updatedContent });
        }
    };

    const toggleEmojiPicker = () => {
        if (emojiButtonRef.current) {
            const buttonRect = emojiButtonRef.current.getBoundingClientRect();
            setEmojiPickerPosition({
                top: buttonRect.bottom + window.scrollY,
                left: buttonRect.left + window.scrollX,
            });
        }
        setShowEmojiPicker((prev) => !prev);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: 'gray.800' }}
                >
                    Manage Posts
                </Typography>
            }
        >
            <Head title="Posts Management" />

            {/* Emoji Picker */}
            {showEmojiPicker &&
                ReactDOM.createPortal(
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 1000,
                            top: emojiPickerPosition.top,
                            left: emojiPickerPosition.left,
                            width: '300px',
                            height: '400px',
                            overflow: 'auto',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </Box>,
                    document.body
                )}

            <Box sx={{ py: 6, bgcolor: 'grey.100' }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, p: 3 }}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Posts</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    placeholder="Search..."
                                    size="small"
                                    onChange={handleSearch}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => setModalOpen(true)}
                                    startIcon={<Add />}
                                >
                                    Add Post
                                </Button>
                            </Box>
                        </Box>

                        {/* Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Poster</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Content</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>{post.poster}</TableCell>
                                            <TableCell>{post.postedDate}</TableCell>
                                            <TableCell>
                                                <Tooltip
                                                    title={
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(post.content), // Use sanitized raw content
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Typography
                                                        sx={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px',
                                                        }}
                                                    >
                                                        {post.content
                                                            .replace(/<\/?[^>]+(>|$)/g, '')
                                                            .slice(0, 100) + '...'}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => {
                                                        setEditingPost(post);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(post.id)}>
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
                            />
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Modal */}
            <CRUDModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingPost(null);
                }}
                title={editingPost ? 'Edit Post' : 'Add Post'}
                onSubmit={handleSave}
            >
                <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    defaultValue={editingPost?.title || ''}
                />
                <ReactQuill
                    theme="snow"
                    value={editingPost?.content || ''}
                    onChange={(value) => {
                        if (editingPost) {
                            setEditingPost({ ...editingPost, content: value });
                        }
                    }}
                />
                <Button ref={emojiButtonRef} onClick={toggleEmojiPicker}>
                    Add Emoji
                </Button>
            </CRUDModal>
        </AuthenticatedLayout>
    );
}
