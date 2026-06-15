const router = require('express').Router();
const passport = require('passport');

// 1. Ruta de inicio de sesión
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// 2. Ruta de callback (donde GitHub redirige después del login)
router.get('/callback', 
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // Guardamos el usuario de GitHub en la sesión para persistencia
    req.session.user = req.user; 
    res.redirect('/api-docs');
  }
);

// 3. Ruta de cierre de sesión
router.get('/logout', (req, res, next) => {
  // Cerramos la sesión de Passport
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    
    // Destruimos la sesión en el servidor
    req.session.destroy((err) => {
      if (err) {
        console.log("Error al destruir la sesión:", err);
        return res.status(500).send("No se pudo cerrar la sesión");
      }
      
      // Limpiamos la cookie de sesión en el navegador
      res.clearCookie('connect.sid');
      
      // Redirigimos al usuario a la raíz o a donde prefieras
      res.redirect('/');
    });
  });
});

module.exports = router;