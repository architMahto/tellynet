var Network = require('../models/networksModel')

module.exports = {
  networkController: {
    all: function (req, res) {
      Network.find({}, function (err, networks) {
        if (err) console.log(err);
        res.json(networks);
      })
    }
  }
};
