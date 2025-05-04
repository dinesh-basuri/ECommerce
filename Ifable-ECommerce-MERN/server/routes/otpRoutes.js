const express = require('express')
const Router = express.Router()
const otpController = require('../controllers/otpController')

Router.post('/send-otp',otpController.sendOTP)

module.exports = Router