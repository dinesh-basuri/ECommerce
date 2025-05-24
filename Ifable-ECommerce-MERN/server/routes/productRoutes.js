const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/searchById',productController.getProductById)
router.get('/searchByPid',productController.getProductByPid)

module.exports = router