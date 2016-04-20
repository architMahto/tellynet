var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    networkSchema = new mongoose.Schema({
      name        : {type: String, required: true},
      country     : {type: String, required: true},
      shows       : [],
      logo        : String
    });

module.exports = mongoose.model('Network', networkSchema);
