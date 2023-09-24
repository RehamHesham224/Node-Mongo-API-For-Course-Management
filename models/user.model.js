const mongoose = require('mongoose');
const validator=require('validator');
const userRoles = require('../Utils/user.roles');

const userSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            validate:[validator.isEmail,'Please provide a valid email'],
        },
        password:{
            type:String,
            required:true,
        },
        token:{
            type:String
        },
        role:{
            type:String,
            enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANAGER],
            default:userRoles.USER
        },
        avatar:{
            type:String,
            default:"uploads/profile.jpeg"
        }
    });

module.exports = mongoose.model('User',userSchema);