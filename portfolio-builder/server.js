const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

// Importa tu configuración de auth (asegúrate de que el path sea correcto)
require('./auth-config');

// 1. CRÍTICO: Necesario para que Render (proxy) gestione bien las cookies
app.set('trust proxy', 1);

// 2. Configuración de sesión robusta
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Mejor en false para no crear sesiones vacías
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true solo si usas HTTPS en producción
    sameSite: 'lax' // 'lax' suele funcionar mejor con OAuth en Render
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

// CORS para que el frontend o Swagger puedan interactuar
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Rutas
app.use('/', require('./routes'));

// Conexión a DB
if (process.env.NODE_ENV !== 'test') {
  mongodb.initDb((err) => {
    if (err) console.log(err);
    else app.listen(process.env.PORT || 8080, () => console.log('Servidor activo'));
  });
}

module.exports = app;