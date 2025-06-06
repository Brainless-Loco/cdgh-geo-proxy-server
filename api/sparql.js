// api/sparql.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET supported' });
  }

  try {
    const response = await axios.get('http://bike-csecu.com:8890/sparql', {
      params: req.query,
      headers: { Accept: 'application/sparql-results+json' },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('SPARQL proxy error:', error.message);
    res.status(500).json({ error: 'SPARQL proxy request failed' });
  }
}
