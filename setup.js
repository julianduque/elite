var uuid    = require('uuid'),
    invites = require('./db/').invites;

var inviteCode = uuid.v4();

invites.put(inviteCode, {
  uses: 2
}, function () {
  console.log('Created ' + inviteCode);
});
