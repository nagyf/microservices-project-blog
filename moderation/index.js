import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', (req, res) => {
    console.log('New event', JSON.stringify(req.body.type));

    if (req.body.type === 'CommentCreated') {
        const comment = req.body.data;

        const status = comment.content.includes('orange')
            ? 'rejected'
            : 'approved';

        axios
            .post('http://localhost:5000/events', {
                type: 'CommentModerated',
                data: { ...comment, status },
            })
            .catch(console.log);
    }

    res.send({ status: 'OK' });
});

const port = 4003;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
