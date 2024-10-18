const express = require('express');
const cors = require('cors');
const router = require('./router.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API running. Go to /tasks or /categories endpoints.');
});

// Utilisation des routes
app.use(router);

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
