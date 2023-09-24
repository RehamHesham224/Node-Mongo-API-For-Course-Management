const express = require('express');

const router=express.Router();

const CourseController=require('../controllers/course.controller'); 

const {CourseValidation}=require('../middlewares/course.validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../Utils/user.roles');
const allowTo = require('../middlewares/allowTo');

router.route('/')
    .get(CourseController.index)
    .post(verifyToken,CourseValidation(),CourseController.store);
    // .post(verifyToken,CourseController.store);


router.route('/:id')
    .get(CourseController.show)
    // .put(CourseController.update)
    .patch(CourseController.patch)
    .delete(verifyToken,allowTo(userRoles.ADMIN,userRoles.MANAGER),CourseController.destroy); 


module.exports=router;