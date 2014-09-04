var express        = require('express'),
    passport       = require('passport'),
    GithubStrategy = require('passport-github').Strategy,
    hackers        = require('../db').hackers,
    invites        = require('../db').invites,
    config         = require('../config'),
    router         = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (username, done) {
  hackers.get(username, function (err, user) {
    done(err, user);
  });
});

passport.use(new GithubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
  }, function (accessToken, refreshToken, profile, done) {
    var username = profile.username;

    hackers.get(username, function (err, user) {
      if (err || !user) {
        // Create the user
        var hacker = {
          name: profile._json.name,
          email: profile._json.email,
          avatar: profile._json.avatar_url,
          github: profile._json.html_url
        };

        hackers.put(username, hacker, function (err) {
          if (err) {
            return done(err);
          }

          done(null, username);
        });
      } else {
        done(null, username);
      }
    });
  }
));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/profile');
  });

router.get('/github/:id', function (req, res, next) {
  var inviteCode = req.params.id;
  invites.get(inviteCode, function (err, invite) {
    if (err || !invite || invite.uses === 0) {
      // TODO: Show error
      return res.redirect('/');
    }

    passport.authenticate('github')(req, res, next);
  });

});

module.exports = router;
