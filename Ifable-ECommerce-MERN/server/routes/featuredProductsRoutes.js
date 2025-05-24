const express = require('express')
const router = express.Router()
const featuredProductsController = require('../controllers/featuredProductsController')

router.get('/',featuredProductsController.getSlides)

module.exports = router