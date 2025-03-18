document.getElementById('reporteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ubicacion = document.getElementById('ubicacion').value;
    const descripcion = document.getElementById('descripcion').value;

    if (ubicacion.trim() === "" || descripcion.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    fetch('http://localhost:3000/api/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ubicacion, descripcion })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        document.getElementById('reporteForm').reset();
    })
    .catch(error => console.error('Error al enviar reporte:', error));
    const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = []; // Simulación de base de datos

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ username }, 'clave_secreta', { expiresIn: '1h' });
    res.json({ token });
});

// Verificación del token
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ mensaje: "Acceso denegado" });

    jwt.verify(token, 'clave_secreta', (err, decoded) => {
        if (err) return res.status(401).json({ mensaje: "Token inválido" });
        req.user = decoded;
        next();
    });
};

module.exports = { router, verificarToken };
const contenedores = [
    { lat: 19.355, lng: -99.092, ubicacion: "Parque X", estado: "Lleno" },
    { lat: 19.360, lng: -99.085, ubicacion: "Escuela Y", estado: "Disponible" }
];

app.get('/api/contenedores', (req, res) => {
    res.json(contenedores);
});
app.get('/api/estadisticas', (req, res) => {
    res.json({
        categorias: ["Plástico", "Vidrio", "Orgánico", "Papel"],
        valores: [120, 85, 200, 60]
    });
});

});

