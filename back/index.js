const express = require('express');
const cors = require('cors');
const twofactor = require('node-2fa');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { database } = require('./DB/database');

const app = express();

const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  for (let user of database) {
    if (user.username === username) {
      res.send('username is taken');
    }
  }
  const hashedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, hashedSalt);
  database.push({
    username,
    password: hashedPassword,
  });
  res.send('confirm');
});

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
