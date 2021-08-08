import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

// Out in-memory database implementation :)
const posts = {};

// List all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Create a new post
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;

    const post = {
        id,
        title,
    };

    posts[id] = post;

    await sendEvent('PostCreated', post);

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('New event', JSON.stringify(req.body.type));
    res.send({ status: 'OK' });
});

// Listen for connections
const port = 4000;
const server = app.listen(port, async () => {
    console.log(`Listening on port ${port} latest...`);
});

async function sendEvent(type, data) {
    return axios
        .post('http://eventbus-srv:5000/events', {
            type,
            data,
        })
        .catch(async (err) => {
            console.log(err.response.status, err.response.data);

            console.error(
                `Error sending event to eventbus. Payload: ${JSON.stringify(
                    data
                )}`
            );
        });
}
