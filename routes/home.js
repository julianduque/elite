var express = require('express'),
    helper  = require('../lib/helper'),
    router  = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/profile', helper.ensureAuthenticated, function (req, res) {
  res.send(req.user);
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

module.exports = router;
