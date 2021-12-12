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
    if (
      user.username === username &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.send(user);
    } else if (user.username === username) {
      return res.send('username is taken');
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
    const generator = twofactor.generateSecret({
      name: 'Fikler App',
      account: username,
    });
    for (let user of database) {
      if (username === user.username) {
        user.secret = generator.secret;
        res.send(generator);
      }
    }
  } else {
    res.send('username is taken');
  }
});

app.put('/verificationToken', (req, res) => {
  const { secret, token } = req.body;
  console.log(secret, token);
  const checkToken = twofactor.verifyToken(secret, token);
  if (checkToken) {
    if (checkToken.delta === 0) {
      res.send('verify token');
    } else {
      res.send('invalid token');
    }
  } else {
    res.send('invalid token');
  }
});

app.get('/database', (req, res) => {
  res.send(database);
});

app.get('/', (req, res) => {
  res.send('hello!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
