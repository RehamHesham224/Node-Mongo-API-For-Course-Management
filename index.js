require('dotenv').config();
const express = require('express');
const path=require('path');
const cors=require('cors');

const app=express();

//static folders
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

//database connection
const mongoose = require('mongoose');
const url=process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log('Database Connected');
});
 
//Routes 
app.use(cors());
app.use(express.json());

const coursesRoute=require('./routes/courses.route');
const usersRoute=require('./routes/users.route');

app.use('/api/courses',coursesRoute);
app.use('/api/users',usersRoute);

const httpStatusText=require('./Utils/httpStatusText');   

//global middleware for not found route
app.all('*',(req,res)=>{
    res.status(404)
    .json({
        "status":httpStatusText.ERROR,
        "message":`Can't find ${req.originalUrl} on this server`
    });
});

//global middleware for error handling
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.statusCode || 500)
    .json({
        "status":err.statusText ||httpStatusText.ERROR,
        "message":err.message, 
        "code":err.code || 500,
        "data":null
    });
});


//server listening
app.listen(process.env.PORT||3000,process.env.APP_URL,()=>{
    console.log('Server is running on port 3000');
});

