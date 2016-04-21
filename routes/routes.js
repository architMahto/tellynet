var router       = require('express').Router();
var networksCtrl = require('../controllers/networksController');
var showsCtrl    = require('../controllers/showsController');

router.route('/networks')
  .get(networksCtrl.networkController.all)

router.route('/networks/:country')
  .get(networksCtrl.networkController.byCountry)

router.route('/shows/:network')
  .get(showsCtrl.showController.byNetwork)


module.exports = router;
