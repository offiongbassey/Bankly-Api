const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = asyncHandler(async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401);
            throw new Error("Not authorized, Please login");
        }
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(verification.id)
        if(!user){
            res.status(400);
            throw new Error("User not found");
        }
        req.user = user;

        next();
        
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
})