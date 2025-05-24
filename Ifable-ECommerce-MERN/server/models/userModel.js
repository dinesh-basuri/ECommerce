const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (e) {
        return e === this.password;
      },
      message: `password doesn't match`
    }
  }
});

userSchema.pre('save',async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next()
})

userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword)
}

const user = mongoose.model('user',userSchema)

module.exports = user