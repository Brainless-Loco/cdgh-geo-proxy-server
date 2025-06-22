module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello Brainless!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};