import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    console.log('New event', JSON.stringify(req.body));

    switch (req.body.type) {
        case 'PostCreated':
            const { id, title } = req.body.data;
            posts[id] = { id, title, comments: [] };
            break;
        case 'CommentCreated':
            const comment = req.body.data;
            posts[comment.postId].comments.push({
                id: comment.id,
                content: comment.content,
                status: comment.status,
            });
            break;
        case 'CommentUpdated':
            const commentUpdate = req.body.data;
            posts[commentUpdate.postId].comments = [
                ...posts[commentUpdate.postId].comments.filter(
                    (c) => c.id !== commentUpdate.id
                ),
                commentUpdate,
            ];
            break;
        default:
            console.log('Unknown event', req.body.type);
            break;
    }

    res.send({ status: 'OK' });
});

const port = 4002;
const server = app.listen(port, async () => {
    console.log(`Listening on port ${port}...`);
});
