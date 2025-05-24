require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const DB=process.env.DB
const authRoutes = require('./routes/authRoutes')
const otpRoutes = require('./routes/otpRoutes')
const productRoutes = require('./routes/productRoutes')
const featuredProductRoutes = require('./routes/featuredProductsRoutes')

app.use(express.json())
app.use(cors())
app.use('/api/v1/user',authRoutes)
app.use('/api/v1/auth',otpRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/featuredProducts',featuredProductRoutes)

mongoose.connect(DB).then(()=>{
  console.log('connected to database')
})

app.listen(PORT, '0.0.0.0', ()=>{
  console.log(`server is running on port ${PORT}`)
})

module.exports = app