const express = require('express');
const fetch = require('node-fetch');
const app = express();
const backendUrl = 'http://core-banking-app-backend-api:8080';
const PROCESSOR_URL = 'http://core-banking-app-transaction-service:5000';


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

app.get('/transactions/*', async (req, res) => {
    const url = `${PROCESSOR_URL}${req.path.replace('/transactions', '')}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Backend fetch failed' });
    }
  });


app.listen(80, () => console.log('Frontend proxy on port 80'));