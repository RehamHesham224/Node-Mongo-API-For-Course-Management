const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const httpStatusText=require('../Utils/httpStatusText');
const asyncWrapper=require('../middlewares/asyncWrapper');
const AppError=require('../Utils/appError');
const bcrypt=require('bcryptjs');
const generateJWT = require('../Utils/generateJWT');

const index= asyncWrapper(
    async(req, res) => {
        const limit=req.query.limit || 10 ;
        const page=req.query.page || 1;
        const skip=(page-1)*limit;
    
        const users=await User.find({},{"__v":0,"password":0}).limit(limit).skip(skip);
    
        res.json({"status":httpStatusText.SUCCESS,"data":users});
    }
)

const register=asyncWrapper(
    async(req, res,next) => {
        // const errors = validationResult(req);
        // if(!errors.isEmpty()) {
        //     const error = AppError.create(errors.array(), 400, httpStatusText.FAIL)
        //     return next(error);
        // }
        // console.log(req.body);
        
        const {firstName,lastName,email,password,role}=req.body;
        const oldUser=await User.findOne({email:email});
        if(oldUser){
            const error=AppError.create("User already exists",400,httpStatusText.FAIL);
            return next(error);
        } 

        const hashedPassword=await bcrypt.hash(password,12);
        const user=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role,
            avatar:req.file.filename
        });
        const token=await generateJWT({id:user._id,email:user.email,role:user.role});
        user.token=token;
        await user.save();
        return res.status(201).json({"status":httpStatusText.SUCCESS,"data":user});
    }
)
const login=asyncWrapper(
    async(req, res,next) => {
        const {email,password}=req.body;
        if(!email || !password){
            const error=AppError.create("Please provide email and password",400,httpStatusText.FAIL);
            return next(error);
        }
    
        const user= await User.findOne({email:email})
        if(!user){
            const error=AppError.create("User Not Found",404,httpStatusText.FAIL);
            return next(error);
        }

        const matchedPassword=await bcrypt.compare(password,user.password);
        if(!user || !matchedPassword){
            const error=AppError.create("Incorrect email or password",401,httpStatusText.FAIL);
            return next(error);
        }

        const token=await generateJWT({id:user._id,email:user.email,role:user.role});
        res.status(200).json({"status":httpStatusText.SUCCESS,"data":{user,token}});


})

module.exports={
    index,
    register,
    login
}