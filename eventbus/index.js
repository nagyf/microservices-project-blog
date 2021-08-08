import axios from 'axios';
import express from 'express';

const app = express();

app.use(express.json());

const services = [
    'http://localhost:4000/events',
    'http://localhost:4001/events',
    'http://localhost:4002/events',
    'http://localhost:4003/events',
];

app.post('/events', (req, res) => {
    const event = req.body;

    const promises = services.map(async (url) => {
        try {
            return axios.post(url, event);
        } catch (err) {
            console.error(
                `Error sending event to ${url}. Payload: ${JSON.stringify(
                    event
                )}`
            );
        }
    });

    Promise.all(promises);

    res.send({ status: 'OK' });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
