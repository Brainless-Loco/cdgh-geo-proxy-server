const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Configure CORS
app.use(cors({
    origin: true, // Reflects request's Origin
    credentials: true, // Allows credentials
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());

// Root endpoint: GET /
app.get('/', (req, res) => {
    console.log('Root Request - Origin:', req.headers.origin);
    res.json({ message: 'Hello Brainless!' });
});

app.get('/sparql', async (req, res) => {
    //   console.log('SPARQL Request - Origin:', req.headers.origin);
    //   console.log('Received Query:', req.query.query);

    // Validate query parameter
    if (!req.query.query) {
        console.error('Missing query parameter');
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    try {
        // Construct the URL with explicit encoding
        const decodedQuery = decodeURIComponent(req.query.query);

        console.log("D: ",decodedQuery)

        const response = await axios.get('http://bike-csecu.com:8890/sparql', {
            params: {
                query: decodedQuery,
                format: 'application/sparql-results+json',
            },
            headers: {
                Accept: 'application/sparql-results+json',
            },
            timeout: 10000,
        });

        console.log('SPARQL Response Status:', response.status);
        res.json(response.data);
    } catch (error) {
        // console.error('SPARQL Error:', {
        //   message: error.message,
        //   code: error.code,
        //   status: error.response?.status,
        //   data: error.response?.data
        // });
        res.status(500).json({
            error: 'SPARQL request failed',
            details: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
});

// Export for Vercel
module.exports = app;