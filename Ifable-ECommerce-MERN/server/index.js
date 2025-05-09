require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const DB=process.env.DB
const authRoutes = require('./routes/authRoutes')
const otpRoutes = require('./routes/otpRoutes')

app.use(express.json())
app.use(cors())
app.use('/api/v1/user',authRoutes)
app.use('/api/v1/auth',otpRoutes)

mongoose.connect(DB).then(()=>{
  console.log('connected to database')
})

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`)
})

module.exports = app