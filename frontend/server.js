const express = require('express');
const fetch = require('node-fetch');
const app = express();
const backendUrl = 'http://core-banking-app-backend-api:8080';

app.use(express.static('.'));

app.get('/api/*', async (req, res) => {
  const url = `${backendUrl}${req.path.replace('/api', '')}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Backend fetch failed' });
  }
});

app.listen(80, () => console.log('Frontend proxy on port 80'));