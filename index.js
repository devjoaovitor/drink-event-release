const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['https://drink-event-release-front.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido por CORS'));
    }
  },
}));
app.use(bodyParser.json());
app.use('/api', routes);

app.use('/teste', require('./routes/routes'));

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

module.exports = app;