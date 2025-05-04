const otpModel = require('../models/otpModel')
const user = require('../models/userModel')

exports.signUp = async (req,res) => {
  try {
    const {firstName,lastName,email,phoneNumber,password,confirmPassword,otp} = req.body

    if(!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(403).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const isUserExists = await user.findOne({email})
    if(isUserExists) {
      return res.status(401).json({
        status: false,
        message: 'user already registered'
      });
    }

    const OTP = await otpModel.find({email})
    if (OTP.length === 0 || otp !== OTP[0].otp) {
      return res.status(400).json({
        status: false,
        message: 'The OTP is not valid',
      });
    }

    const newUser = await user.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch(err) {
    return res.status(500).json({ status: false, error: err.message });
  }
}