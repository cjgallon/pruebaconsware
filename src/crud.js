const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Rutas para CRUD de platillos
app.use(express.json());

// Crear un platillo
app.post('/platillos', (req, res) => {
  const { nombre, precio } = req.body;
  const query = 'INSERT INTO platillos (nombre, precio) VALUES (?, ?)';
  db.query(query, [nombre, precio], (err, result) => {
    if (err) {
      console.error('Error al crear el platillo: ' + err);
      return res.status(500).send('Error interno del servidor');
    }
    res.send('Platillo creado con éxito');
  });
});

// Leer todos los platillos
app.get('/platillos', (req, res) => {
  db.query('SELECT * FROM platillos', (err, result) => {
    if (err) {
      console.error('Error al obtener los platillos: ' + err);
      return res.status(500).send('Error interno del servidor');
    }
    res.json(result);
  });
});

// Actualizar un platillo
app.put('/platillos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const query = 'UPDATE platillos SET nombre = ?, precio = ? WHERE id = ?';
  db.query(query, [nombre, precio, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el platillo: ' + err);
      return res.status(500).send('Error interno del servidor');
    }
    res.send('Platillo actualizado con éxito');
  });
});

// Eliminar un platillo
app.delete('/platillos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM platillos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el platillo: ' + err);
      return res.status(500).send('Error interno del servidor');
    }
    res.send('Platillo eliminado con éxito');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
