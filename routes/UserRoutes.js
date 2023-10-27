const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.delete('/delete/:id', userController.deleteUser);

exports.userRouter = router;
