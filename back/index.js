const express = require('express');
const twofactor = require('node-2fa');

const app = express();

const PORT = 3001;

app.use(express.json());

app.post('/verification', (req, res) => {
  const { username } = req.params;
  res.send(twofactor.generateSecret({ name: 'Fikler App', account: username }));
});

app.get('/', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
