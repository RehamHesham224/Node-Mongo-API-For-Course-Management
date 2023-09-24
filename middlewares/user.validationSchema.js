const {body} =require("express-validator");

const UserValidation=()=>{
    return [
        body('firstName')
            .notEmpty()
            .isLength({min:2})
            .withMessage('First Name at least 2 chars'),
    
        body('lastName')
            .notEmpty()
            .isLength({min:2})
            .withMessage('Last Name at least 2 chars'),

        body('email')
            .notEmpty()
            .isLength({min:2})
            .isEmail()
            .withMessage('Enter a valid email address'),

        body('password')
            .notEmpty()
            .isLength({min:8})
            .isStrongPassword()
            .withMessage('Enter a valid Password'),

    ]
};
module.exports={
    UserValidation
};