var level    = require('level'),
    sublevel = require('level-sublevel'),
    db       = sublevel(level('./elite.db', {
      valueEncoding: 'json'
    }));

module.exports = {
  hackers: db.sublevel('hackers'),
  invites: db.sublevel('invites')
};
