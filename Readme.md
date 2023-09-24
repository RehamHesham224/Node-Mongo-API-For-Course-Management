# Node.js API for Courses Management

This Node.js application is a simple API for managing courses. It allows you to perform basic CRUD operations on courses, including creating, reading, updating, and deleting them. The API is built using Node.js, Express.js, and MongoDB.

## Features

- Integrate Mongodb with Node Express App

- Course CRUD Operation
    - Create Courses: 
        - Add new courses to the system with a title, price.
        - Make Two Types Validation on DB Schem and Application layer.
    - Read Courses: 
        - Retrieve a list of all courses using pagination. 
        - or get details about a specific course.
    - Update Courses: Modify the information of existing courses, such as updating the title, price.
    - Delete Courses: Remove courses from the system.

- Authentication  & Autherization
    - Register user 
        - based on role "allowTo Middleware"
        - or default user using "verifyToken Middleware"
        - Upload Avatar Image
    - Login User.
    - Get All Users.