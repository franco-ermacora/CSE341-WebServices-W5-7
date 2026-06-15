const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

require('./auth-config');

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // En producción (Render) usas HTTPS, así que secure: true es correcto
    secure: process.env.NODE_ENV === 'production', 
    // 'none' requiere secure: true. Si da error, cambia a 'lax'
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

if (process.env.NODE_ENV !== 'test') {
  mongodb.initDb((err) => {
    if (err) console.log(err);
    else app.listen(process.env.PORT || 8080, () => console.log('Servidor activo'));
  });
}

module.exports = app;