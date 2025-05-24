const mongoose = require('mongoose')

const productDetailsSchema = new mongoose.Schema({
  "Style Code": String,
  "Closure": String,
  "Pockets": String,
  "Fabric": String,
  "Pattern": String,
  "Color": String
},{_id:false})

const productSchema = new mongoose.Schema({
  "actual_price": {
    type: String,
    required: true
  },
  "average_rating": {
    type: String,
    required: true
  },
  'brand': {
    type: String,
    required: true
  },
  "category": {
    type: String,
    required: true
  },
  "description": {
    type: String,
    required: true
  },
  "discount": {
    type: String,
    required: true
  },
  "images": [String],
  "out_of_stock": Boolean,
  "pid": {
    type: String,
    required: true
  },
  "product_details" : productDetailsSchema,
  "seller" : {
    type: String,
    required: true
  },
  "selling_price": {
    type: String,
    required: true
  },
  "sub_category": {
    type: String,
    required: true
  },
  "title": {
    type: String,
    required: true
  },
  "url": {
    type: String,
    required: true
  },
  "crawled_at" : {
    type: Date,
    required: true
  },
})

const productModel = new mongoose.model('product',productSchema)

module.exports = productModel