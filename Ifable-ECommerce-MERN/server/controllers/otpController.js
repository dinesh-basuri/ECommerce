const otp = require('../models/otpModel')
const user = require('../models/userModel')
const otpGenerator = require('otp-generator')

exports.sendOTP = async (req,res) => {
  try {
    const {email} = req.body
    const isUserExists = await user.findOne({email})
    if(isUserExists) {
      return res.status(401).json({
        status: false,
        message: 'user already registered'
      })
    }

    const newOTP = otpGenerator.generate(6)

    let result = await otp.findOne({otp: newOTP})

    while(result) {
      newOTP = otpGenerator.generate(6)
      result = await otp.findOne({otp: newOTP})
    }

    const otpPayload = { email, otp:newOTP };
    await otp.create(otpPayload);

    res.status(200).json({
      status: true,
      message: 'OTP sent successfully',
      newOTP,
    });
  } catch(e) {
    return res.status(500).json({ status: false, error: error.message });
  }
}