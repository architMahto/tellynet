var mongoose                  = require('mongoose'),
    bcrypt                    = require('bcryptjs'),
    Schema                    = mongoose.Schema,
    userSchema                = new mongoose.Schema({
      firstName               : String,
      lastName                : String,
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

    userSchema.methods.comparePassword = function (password) {
      var user = this;
      return bcrypt.compareSync(password, user.password);
    }

    module.exports = mongoose.model('User', userSchema);
