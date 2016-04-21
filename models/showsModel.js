var mongoose          = require('mongoose'),
    Schema            = mongoose.Schema,
    showSchema        = new mongoose.Schema({
      name            : {type: String, required: true},
      details         : {synopsis: String},
      seasons         : [],
      specialFeatures : [],
      poster          : String,
      network         : {type: Schema.Types.ObjectId, ref: 'Network'}
    });

module.exports = mongoose.model('Show', showSchema);
