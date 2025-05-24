const ProductModel = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.getProductById = catchAsync(async (req, res) => {
  const { productId } = req.query;
  let product;

  if (!productId) {
    return res
      .status(404)
      .json({ status: false, message: "Please provide id" });
  }

  product = await ProductModel.findById(productId);
  if (product) {
    res.status(200).json({
      status: true,
      product,
    });
  }
});

exports.getProductByPid = catchAsync(async (req, res) => {
  const { pid } = req.query;
  let product;

  if (!pid) {
    return res
      .status(404)
      .json({ status: false, message: "Please provide id" });
  }

  product = await ProductModel.findOne({ pid: pid });
  if (product) {
    res.status(200).json({
      status: true,
      product,
    });
  }
});
