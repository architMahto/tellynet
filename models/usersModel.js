var mongoose                  = require('mongoose'),
    bcrypt                    = require('bcrypt'),
    Schema                    = mongoose.Schema,
    userSchema                = new mongoose.Schema({
      name                    : String,
      email                   : String,
      password                : String,
      favoriteEpisodes        : [],
      favoriteSpecialFeatures : []
    });

    userSchema.pre('save', function(next) {
      var user = this;
      if (!user.isModified('password')) return next();
      user.password = bcrypt.hashSync(user.password, 8);

      next()
    })

    userSchema.methods.comparePassword = function (pw) {
      var user = this;
      return bcrypt.compareSync(password, user.password);
    }

    module.exports = {
      User: mongoose.model('User', userSchema);
    };
