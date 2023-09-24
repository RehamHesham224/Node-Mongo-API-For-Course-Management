const express = require('express');
const router=express.Router();
const upload=require('../Utils/uploadImage');

const UserController=require('../controllers/user.controller');
const {UserValidation}=require('../middlewares/user.validationSchema');
const verifyToken=require('../middlewares/verifyToken');

router.route('/')
    .get(verifyToken,UserController.index);

router.route('/register')
    .post(upload.single('avatar'),UserController.register);
    // .post(UserValidation(),upload.single('avatar'),UserController.register);

router.route('/login')
    .post(UserController.login);

module.exports=router;