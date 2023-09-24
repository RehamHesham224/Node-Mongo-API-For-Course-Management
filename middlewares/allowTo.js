const appError = require("../Utils/appError")
const httpStatusText=require('../Utils/httpStatusText')

module.exports=(...roles)=>{
    return (req,res,next)=>{
         if(!roles.includes(req.user.role)){
            return next(appError.create("this role is not authorized",401,httpStatusText.FAIL))
         }
         next();
    }
}