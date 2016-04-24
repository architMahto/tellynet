var router       = require('express').Router();
var networksCtrl = require('../controllers/networksController');
var showsCtrl    = require('../controllers/showsController');
var usersCtrl    = require('../controllers/usersController');
var jwt          = require('jsonwebtoken');
var secret       = "A super secret key";

// router.route('/signIn')
//   .post(usersCtrl.userController.signIn)
//
// router.route('/users')
//   .post(usersCtrl.userController.create)
//
// router.use(function (req, res, next) {
//   var token = req.body.token || req.params.token || req.headers['x-access-token'];
//
//   console.log("Someone is visiting our API, we should check to see if they are logged in");
//
//   if (token) {
//     jwt.verify(token, secret, function (err, decoded) {
//       if (err) {
//         return res.status(403).send({success: false, message: "Can't authenticate token."})
//       } else {
//         console.log("Decoding token", decoded);
//         req.decoded = JSON.stringify(decoded);
//         next();
//       }
//     })
//   } else {
//     return res.status(403).send({success: false, message: "No token provided."});
//   }
// })

router.route('/networks')
  .get(networksCtrl.networkController.all)

router.route('/networks/:country')
  .get(networksCtrl.networkController.byCountry)

router.route('/showsbynetwork/:id')
  .get(showsCtrl.showController.byNetwork)

router.route('/shows/:id')
  .get(showsCtrl.showController.getShow)

router.route('/me')
  .get(function (req, res) {
    console.log("Passed decoded info: ", req.decoded);
    res.json(req.decoded)
  })

module.exports = router;
