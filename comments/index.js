import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

// Out in-memory database implementation :)
const comments = {};

// List all comments
app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.send(comments[postId] || []);
});

// Create a new comment
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const comment = {
        id: commentId,
        postId,
        content: req.body.content,
        status: 'pending',
    };

    const commentsForThisPost = comments[postId] || [];
    commentsForThisPost.push(comment);
    comments[postId] = commentsForThisPost;

    await axios
        .post('http://localhost:5000/events', {
            type: 'CommentCreated',
            data: comment,
        })
        .catch((err) => {
            console.error(
                `Error sending event to eventbus. Payload: ${JSON.stringify(
                    post
                )}`
            );
        });

    res.status(201).send(comments[postId]);
});

app.post('/events', (req, res) => {
    console.log('New event', JSON.stringify(req.body.type));

    if (req.body.type === 'CommentModerated') {
        const comment = req.body.data;
        const postId = comment.postId;

        comments[postId] = [
            ...comments[postId].filter((c) => c.id !== comment.id),
            comment,
        ];

        axios
            .post('http://localhost:5000/events', {
                type: 'CommentUpdated',
                data: comment,
            })
            .catch(console.error);
    }

    res.send({ status: 'OK' });
});

// Listen for connections
const port = 4001;
const server = app.listen(port, async () => {
    console.log(`Listening on port ${port}...`);
});
