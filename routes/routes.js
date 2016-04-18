var router = require('express').Router();

router.get('/', function (req, res) {
  res.sendFile('index.html', {root: './public/views'});
});

module.exports = router;
