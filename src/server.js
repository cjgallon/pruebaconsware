const express = require('express');
const mongoose = require('mongoose');
const app = express();
const platillosRouter = require('./routes/platillos');

mongoose.connect('mongodb://localhost/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(express.static('public'));

app.use('/', platillosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
