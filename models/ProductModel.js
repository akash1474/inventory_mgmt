const mongoose = require('mongoose');
const validator = require('validator')

const productSchema= new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Name is required'],
	},
	category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required:[true,'Category is required'],
    },
    price:{
		buy:{
	    	type:Number,
			required:[true,'Buy Price is required'],
		},
		sell:{
	    	type:Number,
			required:[true,'Sell Price is required'],
		}	
    },
    unit:{
    	type:String,
    	enum:['kilogram','gram','litre','unit'],
		required:[true,'Unit is required'],
    },
    stock_count:{
    	type:Number,
    	default:0
    },
    createdAt: {
		type: Date,
		default: Date.now(),
    },


});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
