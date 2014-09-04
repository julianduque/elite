var express = require('express'),
    hackers = require('../db').hackers,
    helper  = require('../lib/helper'),
    toArray = require('event-stream').writeArray,
    router  = express.Router();

router.get('/', function (req, res) {
  var writer = toArray(function (err, users) {
    if (err) {
      users = [];
    }

    res.render('index', { hackers: users });
  });

  hackers.createReadStream().pipe(writer);
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
