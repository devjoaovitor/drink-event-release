const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});