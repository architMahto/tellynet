var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    showSchema = new mongoose.Schema({
      name     : {type: String, required: true},
      details  : {synopsis: String},
      seasons  : [],
      poster   : String,
      network  : ObjectID
    });

module.exports = mongoose.model('Show', showSchema);
