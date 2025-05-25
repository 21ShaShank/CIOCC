const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const model1 = require('./model1');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from root

// Helper function to preprocess input data
function preprocess(data) {
  return {
    gender: data.gender === 'Male' ? 1 : 0,
    senior: data.senior === 'Yes' ? 1 : 0,
    partner: data.partner === 'Yes' ? 1 : 0,
    dependents: data.dependents === 'Yes' ? 1 : 0,
    tenure: parseInt(data.tenure),
    phone_service: data.phone_service === 'Yes' ? 1 : 0,
    internet: data.internet === 'Fiber Optic' ? 2 : data.internet === 'DSL' ? 1 : 0,
    contract: data.contract === 'Two year' ? 2 : data.contract === 'One year' ? 1 : 0,
    charges: parseFloat(data.charges),
    competitive_index: parseFloat(data.competitive_index),
    promotion: data.promotion === 'Positive' ? 1 : data.promotion === 'Negative' ? -1 : 0
  };
}

// Prediction route
app.post('/predict', (req, res) => {
  try {
    const input = preprocess(req.body);
    const prediction = model1.predict(input);
    res.json({ probability: (prediction * 100).toFixed(2) + '%' });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed.' });
  }
});

// Route handlers for all pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/page1', (req, res) => {
  res.sendFile(path.join(__dirname, 'page1.html'));
});

app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'page2.html'));
});

app.get('/page3', (req, res) => {
  res.sendFile(path.join(__dirname, 'page3.html'));
});

app.get('/page4', (req, res) => {
  res.sendFile(path.join(__dirname, 'page4.html'));
});

app.get('/page5', (req, res) => {
  res.sendFile(path.join(__dirname, 'page5.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});