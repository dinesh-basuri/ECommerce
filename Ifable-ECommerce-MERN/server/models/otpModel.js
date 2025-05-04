const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5
  }
})

async function sendVerificationMail (email,otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    )
  } catch (e) {
    console.log(e)
  }
}

otpSchema.pre('save', async function(next){
  if(this.isNew) {
    await sendVerificationMail(this.email, this.otp)
  }
  next()
})

const otp = mongoose.model('otp',otpSchema)

module.exports = otp