const featuredProducts = require('../models/featuredProductsModel')
const catchAsync = require('../utils/catchAsync')
const ProductsModel = require('../models/productModel')

exports.getSlides = catchAsync(async (req,res)=>{
  let products; 
  products = await featuredProducts.find({title: 'slides'}).populate("products")
  if(products.length > 0){
    res.status(200).json({
      status: true,
      isDefalt: false,
      products
    })
  } else {
    products = await ProductsModel.find().limit(5)
    res.status(200).json({
      status: true,
      isDefault: true,
      products
    })
  }
})