const {validationResult}=require('express-validator');

let {courses}=require('../data/courses.js');


const index= async(req, res) => {
    res.json(courses);
}
const show= async(req,res)=>{
    try{
        const id=req.params.id;
        const course=courses.find(c=>c.id===+id);

        if(!course) res.status(404).json('The course with the given ID was not found');
        
        return res.json(course);
    }catch(err){
        return res.status(404).json('The course with the given ID was not found');
    }
}

const store= async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }


    const course={
        id:courses.length+1,
        // ...req.body,
        title:req.body.title,
        price:req.body.price
    };

    courses.push(course);

    res.status(201).json(course);
}

const patch= async(req,res)=>{
   try{
    const id=+req.params.id;
    let course=courses.find(c=>c.id===id);
    
    if(!course) res.status(404).send('The course with the given ID was not found');
    
    course={...course,...req.body};
    
    res.status(200).json(course);
   }catch(err){
    res.status(404).send('The course with the given ID was not found');
   }
}
const update=(req,res)=>{
        const id=parseInt(req.params.id)
        const course=courses.find(c=>c.id===id);
        
        if(!course) res.status(404).send('The course with the given ID was not found');
        
        course.title=req.body.title;
        course.price=req.body.price;
        
        res.status(200).json(course);
}

const destroy= async(req,res)=>{
    const id=+req.params.id;

    const course=courses.find(c=>c.id===parseInt(req.params.id));
    
    if(!course) res.status(404).send('The course with the given ID was not found');
    
    const index=courses.indexOf(course);
    courses.splice(index,1);

    const courseId=parseInt(req.params.id);
    courses= courses.filter(c=>c.id!==courseId);

    res.status(200).json({message:'success'});
}

module.exports={
    index,
    show,
    store,
    update,
    patch,
    destroy
}