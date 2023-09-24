const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const httpStatusText = require("../Utils/httpStatusText");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) {
        const error = AppError.create("Please provide token", 400, httpStatusText.FAIL);
        return next(error);
    }

    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        const err = AppError.create("Invalid token", 401, httpStatusText.FAIL);
        return next(err);
    }
}
module.exports = verifyToken;