var express     = require('express');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var path        = require('path');
var mongoose    = require('mongoose');
var port        = process.env.PORT || 3000;
var routes      = require('./routes/routes');
var databaseUrl = 'mongodb://localhost:27017/tellynet';

mongoose.connect(databaseUrl, function (err) {
  console.log("Connected to the DB.");
});

// Create express app
var app = express();

/* middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname + '/public')));

app.listen(port, function () {
  console.log("Server running on port:", port);
});
