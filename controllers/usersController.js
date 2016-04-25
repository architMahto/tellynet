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
    all: function (req, res) {
      User.find({}, function(err, users) {
        if (err) res.json(err);
        res.json(users);
      })
    },
    single: function (req, res) {
      var id = req.params.id;

      User.findOne({_id: id}, function (err, user) {
        if (err) res.json(err);
        res.json(user);
      })
    },
    update: function (req, res) {
      var id = req.params.id;

      User.findOne({_id: id}, function (err, user) {
        if (err) res.json(err);

        if (req.body.email) {user.email = req.body.email;}
        if (req.body.password) {user.password = req.body.password;}

        user.save(function (err, response) {
          if (err) res.json(err);
          res.json(response);
        })
      })
    },
    destroy: function (req, res) {
      var id = req.params.id;

      User.remove({_id: id}, function (err, user) {
        if (err) res.json(err);

        res.json({message: "Deleted User!"})
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
