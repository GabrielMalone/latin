const { translate } = require('./translate');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;


// Use CORS middleware
app.use(cors({
    origin: [   'http://localhost:5501', 
                'http://127.0.0.1:5501',
                'http://localhost:3000',
                'https://latin-r3z3.onrender.com',
                'https://latin-1.onrender.com',
                'https://latinreader.app', 
                'https://www.latinreader.app', 
                'http://localhost:8000'],

    methods:    'GET,POST,PUT,DELETE'
    ,
    allowedHeaders: 'Content-Type'
}));

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
// route handler
// get request will execute the translate function below
// req has the query data (e.g. .../translate?word=natus)
app.get('/translate', (req, res) => {
    const word = req.query.word;  // get the word from the query 
    console.log('Received word for translation:', word);
    // define the translate fucntion
    // call the translate function
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
// start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
