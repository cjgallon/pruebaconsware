const mongoose = require('mongoose');

const platilloSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
});

module.exports = mongoose.model('Platillo', platilloSchema);