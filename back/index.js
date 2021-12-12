const express = require('express');
const twofactor = require('node-2fa');

const app = express();

const PORT = 3001;

app.use(express.json());

app.post('/verification', (req, res) => {
  const { username } = req.body;
  if (username) {
    res.send(
      twofactor.generateSecret({ name: 'Fikler App', account: username })
    );
  } else {
    res.send('username is missing');
  }
});

app.put('/verificationToken', (req, res) => {
  const { secret, token } = req.body;
  const checkToken = twofactor.verifyToken(secret, token);
  if (checkToken.delta === 0) {
    res.send('verify token');
  } else {
    res.send('invalid token');
  }
});

app.get('/', (req, res) => {
  res.send('hello!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
