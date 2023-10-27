const Category = require('../models/CategoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures= require('../utils/apiFeatures');


exports.createCategory = catchAsync(async (req, res, next) => {

  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});


exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category Not Found", 404));
  }

  await Category.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: `category(${category.id}) was deleted successfully!!!`,
  });
});


exports.getCategories = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Category.find(),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    doc,
  });
});