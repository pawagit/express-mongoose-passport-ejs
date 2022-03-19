const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

// GET Routes
router.get('/', (req, res) => {
  res.render('index', { title: 'pawacloud' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/profile', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('profile', { title: 'My Profile' })
);

/**
 * GET /dashboard
 */
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('dashboard', { title: 'Dashboard' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// POST Routes
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
  }),
  (req, res) => {
    console.log(req.user);
  }
);

module.exports = router;