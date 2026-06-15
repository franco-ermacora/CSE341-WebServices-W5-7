const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback', 
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    req.session.user = req.user; 
    res.redirect('/api-docs');
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
        res.redirect('/');
    });
  });
});

module.exports = router;