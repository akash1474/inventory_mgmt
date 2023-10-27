const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures= require('../utils/apiFeatures')


exports.signUp=catchAsync(async(req,res,next)=>{

	const user=await User.findOne({email:req.body.email});

	if(user){
    return next(new AppError("User with Email ID Already Exists", 404));
	}

	const nuser = await User.create({
			name:req.body.name,
	    email: req.body.email,
	    password: req.body.password,
	});

	res.status(201).json({
		message:"User Created",
		data:{
			user:nuser
		}
	});
});

exports.login=catchAsync(async(req,res,next)=>{

	const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

	res.status(200).json({
		message:"Logged in successfully",
		data:{
			user
		}
	});

});

exports.getUser=catchAsync(async(req,res,next)=>{
	
	const user=await User.findById(req.params.id);
	if(!user){
    return next(new AppError("User Not Found", 404));
	}

	res.status(200).json({
		message:"Success",
		data:{
			user
		}
	});

});

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    User.find(),
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

exports.deleteUser=catchAsync(async(req,res,next)=>{

	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
    return next(new AppError("User Not Found", 404));
	}

	res.status(204).json({
		status: "success",
		message: `User(${user.id}) was deleted successfully!!!`,
	});
});