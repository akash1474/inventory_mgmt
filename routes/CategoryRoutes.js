const express = require('express');
const categoryController = require('../controllers/CategoryController');

const router = express.Router();

router.post('/create', categoryController.createCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/all', categoryController.getCategories);

exports.categoryRouter = router;
