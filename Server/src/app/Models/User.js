import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

// define the schema for our user model
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    profile: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      age: Number,
      gender: String,
      address: String,
      website: String,
      bio: String,
      avatar: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


userSchema.virtual('avatarLink').get(function () {
  if (this.profile.avatar != null) {
    return `${process.env.APP_URL}/${process.env.AVATAR_PATH}${this.profile.avatar}`;
  }
  return null;
});

userSchema.set('toJSON', {
  virtuals: true,
});
// create the model for users and expose it to our app
export default mongoose.model('User', userSchema);
