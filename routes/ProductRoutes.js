const express = require('express');
const productController = require('../controllers/ProductController');

const router = express.Router();

router.post('/create', productController.createProduct);
router.get('/all', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

exports.productRouter = router;
