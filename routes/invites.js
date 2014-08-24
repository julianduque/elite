var express = require('express'),
    router  = express.Router(),
    invites = require('../db/').invites;


router.get('/', function (req, res) {
  res.redirect('/');
});

router.get('/:code',function (req, res) {
  var inviteCode = req.params.code;
  invites.get(inviteCode, function (err, invite) {
    if (err) {
      return res.send(500, 'Invite code not found');
    }

    res.render('register');
  });
});

module.exports = router;
