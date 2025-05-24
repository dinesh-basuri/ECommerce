const mongoose = require('mongoose')

const featuredProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ['slides','newArrivals','bestSellers','discounts'],
    required: true
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'product'
  }]
})

const featuredProductsModel = new mongoose.model('featuredProducts',featuredProductsSchema)

module.exports = featuredProductsModel