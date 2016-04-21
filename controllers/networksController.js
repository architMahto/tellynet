var Network = require('../models/networksModel')

module.exports = {
  networkController: {
    all: function (req, res) {
      Network.find({}, function (err, networks) {
        if (err) console.log(err);
        res.json(networks);
      })
    },
    byCountry: function(req, res) {
      console.log(req.params);
      var country = req.params.country;

      Network.find({country: country}, function (err, networks) {
        if (err) console.log(err);
        res.json(networks)
      })
    }
  }
};
