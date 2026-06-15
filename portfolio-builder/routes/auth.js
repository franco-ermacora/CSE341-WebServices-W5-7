const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/api-docs' // Redirige a la documentación tras login
}));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

module.exports = router;