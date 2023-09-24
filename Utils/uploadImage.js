
const appError=require('../Utils/appError');
const httpStatusText=require('../Utils/httpStatusText');

const multer=require('multer');
const diskStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename);
    }
});
const fileFilter=(req,file,cb)=>{
    const imageType=file.mimetype.startsWith('image');
    if(imageType){
        cb(null,true);
    }else{
        cb(appError.create('File MUst be Image',400,httpStatusText.ERROR),false);
    }
}

const upload=multer({
    storage:diskStorage,
    fileFilter:fileFilter
});
module.exports=upload;