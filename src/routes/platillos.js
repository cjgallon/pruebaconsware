const express = require('express');
const router = express.Router();
const Platillo = require('../models/platillo');

// Listar todos los platillos
router.get('/platillos', async (req, res) => {
  const platillos = await Platillo.find();
  res.json(platillos);
});

// Buscar un platillo por ID
router.get('/platillos/:id', async (req, res) => {
  const platillo = await Platillo.findById(req.params.id);
  res.json(platillo);
});

// Agregar un nuevo platillo
router.post('/platillos', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const nuevoPlatillo = new Platillo({ nombre, descripcion, precio });
  await nuevoPlatillo.save();
  res.json(nuevoPlatillo);
});

// Editar un platillo por ID
router.put('/platillos/:id', async (req, res) => {
  const platillo = await Platillo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(platillo);
});

// Eliminar un platillo por ID
router.delete('/platillos/:id', async (req, res) => {
  await Platillo.findByIdAndRemove(req.params.id);
  res.send('Platillo eliminado');
});

module.exports = router;
