const Product = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures= require('../utils/apiFeatures');


exports.createProduct = catchAsync(async (req, res, next) => {

  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});


exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No document found with that ID!!!", 404));
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: `product(${product.id}) was deleted successfully!!!`,
  });
});


exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No document found with that ID!!!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getProduct=catchAsync(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No document found with that ID!!!", 404));
  }

  res.status(200).json({
    status: "success",
    data:{
    	product
    }
  });

});

exports.getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find(),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({
      select: 'name',
      path:'category'
    });
  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    doc,
  });
});