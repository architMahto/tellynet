var Show = require('../models/showsModel');

module.exports = {
  showController: {
    byNetwork: function (req, res) {
      var networkID = req.params.id;

      Show.find({network: ObjectId(networkID)}, function (err, shows) {
        if (err) console.log(err);
        res.json(shows);
      });
    }
  }
};
