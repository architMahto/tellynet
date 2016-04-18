var express    = require('express');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var cors       = require('cors');
var mongoose   = require('mongoose');
var port       = process.env.PORT || 3000;
var routes     = require('./routes/routes');

// Create express app
var app = express();

/* middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/', routes);
app.use(express.static(__dirname + './public'));

app.listen(port, function () {
  console.log("Server running on port:", port);
});
