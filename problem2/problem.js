// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS middleware
app.use(cors());

const BASE_URL = 'http://localhost:5000/'; // Ensure HTTP, not HTTPS

// Fetch users
async function fetchUsers() {
    const response = await axios.get(`${BASE_URL}users`);
    return response.data;
}

// Fetch posts
async function fetchPosts() {
    const response = await axios.get(`${BASE_URL}posts`);
    return response.data;
}

// Fetch comments
async function fetchComments() {
    const response = await axios.get(`${BASE_URL}comments`);
    return response.data;
}

// API to get top users with highest number of posts
app.get('/users', async (req, res) => {
    try {
        const posts = await fetchPosts();

        const userPostCounts = posts.reduce((acc, post) => {
            acc[post.userId] = (acc[post.userId] || 0) + 1;
            return acc;
        }, {});

        const sortedUsers = Object.entries(userPostCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([userId, count]) => ({ userId, count }));

        res.json(sortedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch top users' });
    }
});

// API to get top posts based on comments
app.get('/posts', async (req, res) => {
    try {
        const posts = await fetchPosts();
        const comments = await fetchComments();

        const commentCounts = comments.reduce((acc, comment) => {
            acc[comment.postId] = (acc[comment.postId] || 0) + 1;
            return acc;
        }, {});

        const sortedPosts = posts.map(post => ({
            ...post,
            commentCount: commentCounts[post.id] || 0
        })).sort((a, b) => b.commentCount - a.commentCount);

        res.json(sortedPosts.slice(0, 5));
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch top posts' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
