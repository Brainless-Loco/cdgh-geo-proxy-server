const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/sparql', async (req, res) => {
  try {
    const response = await axios.get('http://bike-csecu.com:8890/sparql', {
      params: req.query,
      headers: { Accept: 'application/sparql-results+json' },
    });
    res.json(response.data);
  } catch (error) {
    console.error('SPARQL proxy error:', error.message);
    res.status(500).json({ error: 'SPARQL proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
