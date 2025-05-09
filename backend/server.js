const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.post('/api/login', (req, res) => {
  const { userName, password } = req.body;
  if (userName === 'admin' && password === 'admin123') {
    return res.json({ token: 'mysecrettoken' });
  }
  return res.status(401).json({ message: 'Invalidssss credentials' });
});

app.listen(8080, () => {
  console.log('Backend running on http://localhost:8080');
});
