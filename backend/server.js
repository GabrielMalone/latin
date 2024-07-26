const cors = require('cors');
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Use CORS middleware
app.use(cors({
    origin: ['*', 'http://localhost:5501', 'http://127.0.0.1:5501','http://localhost:3000',
    'https://latinreaderapp-frontend.onrender.com'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

app.options('*', cors());

// Middleware to log request and response headers
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    res.on('finish', () => {
        console.log('Response Headers:', res.getHeaders());
    });
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Translation route
app.get('/translate', (req, res) => {
    const word = req.query.word; // Handle query parameters here
    console.log('Received word for translation:', word);

    const translate = (word) => {
        return new Promise((resolve, reject) => {
            const spawner = spawn('/app/words', [word]);

            let result = '';
            let error = '';

            spawner.stdout.on('data', (data) => {
                result += data.toString();
                console.log('Received stdout data:', data.toString());
            });

            spawner.stderr.on('data', (data) => {
                error += data.toString();
            });

            spawner.on('close', (code) => {
                if (code === 0) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    };

    translate(word)
        .then(result => {
            res.setHeader('Content-Type', 'text/plain');
            res.send(result);
        })
        .catch(error => {
            console.error('Error translating word:', error);
            res.status(500).send(error);
        });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
