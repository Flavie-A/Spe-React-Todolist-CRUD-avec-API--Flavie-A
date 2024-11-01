const express = require('express');
const cors = require('cors');
const router = require('./router.js');

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('API running. Aller vers /tasks ou /categories endpoints.');
// });

app.use(router);

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
