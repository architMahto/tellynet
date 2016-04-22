var router       = require('express').Router();
var networksCtrl = require('../controllers/networksController');
var showsCtrl    = require('../controllers/showsController');

router.route('/networks')
  .get(networksCtrl.networkController.all)

router.route('/networks/:country')
  .get(networksCtrl.networkController.byCountry)

router.route('/showsbynetwork/:id')
  .get(showsCtrl.showController.byNetwork)

router.route('/shows/:id')
  .get(showsCtrl.showController.getShow)


module.exports = router;
