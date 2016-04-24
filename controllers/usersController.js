var User   = require('../models/usersModel');
var jwt    = require('jsonwebtoken');
var secret = "A super secret key";

module.exports = {
  userController: {
    create: function (req, res) {
      var user = new User(req.body);

      user.save(function (err, user) {
        if (err) {res.json(err);}
        else {res.json(user);}
      });
    },
    get: function (req, res) {
      User.find({}, function(err, users) {
        if (err) res.json(err)
        res.json(users)
      })
    },
    signIn: function (req, res) {
      User.findOne({email: req.body.email}, function (err, user) {
        if (err) res.json(err);

        if (user) {
          if (user.comparePassword(req.body.password)) {
            var token = jwt.sign({email: user.email, id: user._id},
                                  secret,
                                  {expiresInMinutes: 1440});
            res.json({
              success: true,
              message: 'Successfully logged in!',
              token: token
            });
          } else {
            res.json({message: "password does not match"})
          }
        } else {
          res.json({message: "user does not exist"})
        }
      })
    }
  }
};
