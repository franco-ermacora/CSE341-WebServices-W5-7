const session = require('express-session');
const passport = require('passport');
require('./auth-config'); // Crearemos este archivo ahora
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes'));

// Solo conectamos a la DB si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  mongodb.initDb((err) => {
    if (err) console.log(err);
    else app.listen(8080, () => console.log('Servidor activo'));
  });
}

module.exports = app;