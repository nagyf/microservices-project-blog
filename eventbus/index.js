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

const retryTimers = {};
const eventQueue = {};
services.forEach((url) => (eventQueue[url] = []));

app.post('/events', (req, res) => {
    const event = req.body;

    const promises = services.map(async (url) => {
        try {
            await axios.post(url, event);
        } catch (err) {
            console.error(
                `Error sending event to ${url}. Payload: ${JSON.stringify(
                    event
                )}`
            );

            addEventToRetry(url, event);
        }
    });

    Promise.all(promises);
    res.send({ status: 'OK' });
});

function addEventToRetry(service, event) {
    eventQueue[service].push(event);
    registerRetry(service);
}

function registerRetry(service) {
    if (!retryTimers[service]) {
        console.log('Registering retry with 2 seconds');
        retryTimers[service] = setTimeout(retryEvents.bind(null, service), 2000);
    }
}

async function retryEvents(service) {
    try {
        while (eventQueue[service].length > 0) {
            const event = eventQueue[service][0];
            console.log('Retrying event for service', service);
            await axios.post(service, event);
            eventQueue[service] = eventQueue[service].slice(1);
        }

        eventQueue[service] = [];
        console.log('Retries successful');
        delete retryTimers[service];
    } catch (error) {
        console.log('Error retrying event, retrying 2 seconds later');
        retryTimers[service] = setTimeout(
            retryEvents.bind(null, service),
            2000
        );
    }
}

const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
