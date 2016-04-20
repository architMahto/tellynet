var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/tellynet';

mongoose.connect(databaseUrl);

var Network = require('../models/networksModel');
var networkData = require('../models/networks.json');

networkData.forEach(function(network) {
  var newNetwork = new Network(network);

  newNetwork.save(function (err, doc) {
    console.log(err, doc);
  });
});
