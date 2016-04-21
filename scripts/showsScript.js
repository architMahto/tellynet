var mongoose    = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/tellynet';

mongoose.connect(databaseUrl);

var Show = require('../models/showsModel');
var Network = require('../models/networksModel')
var showData = require('../models/shows.json');

showData.forEach(function(show) {
  var newShow = new Show(show);

  newShow.save(function (err, doc) {
    console.log(err, doc);

    Network.findByIdAndUpdate(doc.network, {$push: {"shows": doc._id}}, function (err, doc) {
      console.log(err, doc);
    })
  })
});
