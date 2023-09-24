# Node.js API for Courses Management

This Node.js application is a simple API for managing courses. It allows you to perform basic CRUD operations on courses, including creating, reading, updating, and deleting them. The API is built using Node.js, Express.js, and MongoDB.

## Features

- MongoDB Integration: Seamlessly integrates with MongoDB as the database system, providing a robust and scalable data storage solution.

- Course CRUD Operation
    - Create Courses: Add new courses to the system with a title, price, and additional details. Incorporates two layers of validation, both at the database schema level and application layer to ensure data integrity.
    - Read Courses: Retrieve a list of all courses with pagination support or access details about a specific course.
    - Update Courses: Modify the information of existing courses, including updating titles, prices, and other attributes.
    - Delete Courses: Remove courses from the system, keeping your course catalog up-to-date.
 
- Authentication and Authorization:

    - User Registration: Users can register based on roles. The "allowTo" middleware restricts access based on user roles, while the "verifyToken" middleware ensures secure authentication. Users can also upload an avatar image.
    - User Login: Users can log in securely to access protected resources.
    - User Management: Retrieve a list of all users for administrative purposes.
