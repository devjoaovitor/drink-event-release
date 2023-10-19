const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const login = require('./routes/login');

app.use(cors());
app.use(bodyParser.json());

// Rota para a página de login
app.get('/login', (req, res) => {
  res.send('Esta é a página de login.');
});

// Configure a rota para o login
app.use('/api/login', login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;