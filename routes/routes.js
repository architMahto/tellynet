var router       = require('express').Router();
var networksCtrl = require('../controllers/networksController');

router.route('/networks')
  .get(networksCtrl.networkController.all)


module.exports = router;
