var Show = require('../models/showsModel');

module.exports = {
  showController: {
    byNetwork: function (req, res) {
      var networkID = req.params.id;

      Show.find({network: networkID}, function (err, shows) {
        if (err) console.log(err);
        res.json(shows);
      });

    },
    getShow: function (req, res) {
      console.log(req.params);
      var id = req.params.id;

      Show.findOne({_id: id}, function (err, show) {
        if (err) console.log(err);
        res.json(show);
      });
    }
  }
};
