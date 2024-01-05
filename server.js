const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const baseUrl = 'https://api.n2yo.com/rest/v1/satellite/radiopasses';

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
];

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use((request, _, next) => {
  console.log(`Received: ${request.method}: ${request.path}`);
  next();
});

app.get('/api/satellites', async (request, response) => {
  const {
    apiKey,
    satelliteId,
    latitude,
    longitude,
    altitude,
    minElevation,
  } = request.query;

  const apiResponse = await fetch(`${baseUrl}/${satelliteId}/${latitude}/${longitude}/${altitude}/8/${minElevation}/&apiKey=${apiKey}`);

  if (!apiResponse.ok) {
    return response.status(apiResponse.status).send();
  }

  const result = await apiResponse.json();

  if (!result || (result && result.info.satid.toString() !== satelliteId)) {
    return response.status(500).send();
  }

  console.log(`Successful fetch for satellite ${satelliteId}`);
  response.status(200).json(result.passes || []);
});

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || !whitelist.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS.'));
  },
}));

app.get('*', (request, response) => {
  console.log('Serving up React build html');
  response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server listening at port 5000');
});
