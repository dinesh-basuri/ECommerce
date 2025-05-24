const otpModel = require('../models/otpModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.signUp = async (req,res) => {
  try {
    const {firstName,lastName,email,phoneNumber,password,confirmPassword,otp,role} = req.body

    if(!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(403).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const isUserExists = await userModel.findOne({email})
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

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      role
    });
    return res.status(200).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch(err) {
    return res.status(500).json({ status: false, error: err.message });
  }
}

exports.login = async (req,res) => {
  try {
    const {email,password} = req.body
    if(!email || !password) {
      return res.status(404).json({
        status: false,
        message: 'please provide both email and password'
      })
    }
    let user = await userModel.find({email})
    if(!user) {
      return res.status(404).json({
        status: false,
        message: 'user not available please signup'
      })
    }
    let token = signToken(user._id)
    if(token) {
      return res.status(200).json({
        status: true,
        token: token
      })
    }
  } catch(err) {
    return res.status(500).json({ status: false, error: err.message });
  }
}