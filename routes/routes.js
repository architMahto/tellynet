var router       = require('express').Router();
var networksCtrl = require('../controllers/networksController');

router.route('/networks')
  .get(networksCtrl.networkController.all)

router.route('/networks/:country')
  .get(networksCtrl.networkController.byCountry)


module.exports = router;
