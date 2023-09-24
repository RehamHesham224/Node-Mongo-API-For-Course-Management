const {validationResult}=require('express-validator');
const Course = require('../models/course.model');
const httpStatusText=require('../Utils/httpStatusText');
const asyncWrapper=require('../middlewares/asyncWrapper');
const AppError=require('../Utils/appError');

const index= asyncWrapper(
    async(req, res) => {
        // const courses=await Course.find({"price":{$gt:3000}}).sort({title:1});
        const limit=req.query.limit || 10 ;
        const page=req.query.page || 1;
        const skip=(page-1)*limit;
    
        const courses=await Course.find({},{"__v":0})
            .limit(limit).skip(skip)
            .sort({title:1}).select({title:1,price:1});
    
        res.json({"status":httpStatusText.SUCCESS,"data":courses});
    }
)
const show= asyncWrapper(
    async(req,res,next)=>{
        const id=req.params.id;
        const course=await Course.findById(id);

        if(!course){
            const error=AppError.create('The course with the given ID was not found',404,httpStatusText.FAIL);
            return next(error);
        }
        
        return res.json({"status":httpStatusText.SUCCESS,"data":course});
})

const store= asyncWrapper(
    async(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const error=AppError.create(errors.array(),400,httpStatusText.ERROR);
            return next(error);
        } 
        
        const {title,price}=req.body;
        const course= new Course({
            title,
            price
        });
        await course.save();
        return res.status(201).json({"status":httpStatusText.SUCCESS,"data":course});
    }
)

const patch=asyncWrapper(
    async(req,res,next)=>{
            const id=req.params.id;
            let course=await Course.findByIdAndUpdate({_id: id},{$set: {...req.body}});
            
            if(!course) {
                const error=AppError.create('The course with the given ID was not found',404,httpStatusText.FAIL);
                return next(error);
            }            
            return res.status(200).json({"status":httpStatusText.SUCCESS,"data":course});
    }
)

const destroy= asyncWrapper(
    async(req,res,next)=>{
        const id=req.params.id;
        let course=await Course.findOneAndDelete({_id: id});
    
        if(!course) {
            const error=AppError.create('The course with the given ID was not found',404,httpStatusText.FAIL);
            return next(error);
        } 

        res.status(200).json({"status":httpStatusText.SUCCESS,"data":null});
    }
)

module.exports={
    index,
    show,
    store,
    patch,
    destroy
}