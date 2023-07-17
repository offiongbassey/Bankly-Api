const express = require("express");
const asyncHandler = require("express-async-handler");
const sequelize = require("../config/database");
const Savings = require("../models/savingsModel");
const User_Savings = require("../models/userSavingsModel");
const User = require("../models/userModel");

const errorHelper = (res, code, msg) => {
    res.status(code);
    throw new Error(msg);
}

exports.createSavings = asyncHandler(async(req, res) => {
    const {amount, type, start_date, end_date, interval, method} = req.body;
    if(!amount){
        errorHelper(res, 400, "Please provide an Amount");
    }
    if(!type){
        errorHelper(res, 400, "Please select a Type");
    }
    if(!start_date){
        errorHelper(res, 400, "Please choose a Start Date");
    }
    if(!end_date){
        errorHelper(res, 400, "Please choose an End Date");
    }
    if(!interval){
        errorHelper(res, 400, "Please provide a Duration");
    }
    if(!method){
        errorHelper(res, 400, "Please select the Method.")
    }
    if(amount < 100){
        errorHelper(res, 400, "Minimum amount is ₦100");
    }

    const accountNo = Math.floor(25237362626 + Math.random() * 987765436666);
       const savings = await Savings.create({
            amount,
            balance: 0,
            status: "Active",
            type,
            start_date,
            end_date, 
            method,
            interval,
            accountNo,
            userId: req.user.id
        });
        if(savings){
            return res.status(201).json({message: "Target Savings Successfully Created."});
        }
        errorHelper(res, 500, "An error occured, please try again later.");
        
});

exports.getSavings = asyncHandler(async(req, res) => {
    const savings = await Savings.findAll({where: {userId: req.user.id}});
    if(!savings){
        errorHelper(res, 404, "Savings not available");
    }
    return res.status(200).json(savings);
});
exports.getUserAccount = asyncHandler(async(req, res) => {
const {accountNo} = req.body;
if(!accountNo){
    errorHelper(res, 404, "Account Number is required");
}
const saving = await Savings.findOne({where: {accountNo},
    include: [
        {model: User,
        attributes: [
            "id",
            "name", 
            "email"
        ]
        }
    ]
});
if(!saving){
    errorHelper(res, 404, "Account not found.");
}else{
return res.status(200).json(saving);
}
});