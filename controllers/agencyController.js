const express = require("express");
const asyncHandler = require("express-async-handler");
const Agency = require("../models/agencyModel");
const { errorHelper } = require("../middleware/errorHelper");
const sequelize = require("../config/database");
const User = require("../models/userModel");
const crypto = require("crypto");
const Savings = require("../models/savingsModel");
const Transaction = require("../models/transactionModel");
const User_Savings = require("../models/userSavingsModel");

exports.createAgency = asyncHandler(async(req, res, next) => {
const {name, address, phone, goal} = req.body;
const trans = await sequelize.transaction();
if(!name){
errorHelper(res, 400, "Please provide a Name");
}
if(!address){
    errorHelper(res, 400, "Please provide an Address");
}
if(!phone){
    errorHelper(res, 400, "Phone Number is required");
}
if(!goal) {
    errorHelper(res, 400, "Please provide a Goal");
}
try {
    
    //check if user is already an agent
    const isAgent = await User.findOne({where: {id:req.user.id, role: "Agent"}});
    if(isAgent){
        errorHelper(res, 400, "You are already an Agent.");
    }
    

const status = "Active";
let url = name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").toLowerCase();
//check if url already exist
const verifyUrl = await Agency.findOne({where: {url}});
if(verifyUrl){
    const digest = crypto.randomInt(0,198287);
    url = url+digest
}
const saveAgency = await Agency.create({
    name,
    address,
    phone,
    status,
    url,
    goal,
    userId: req.user.id
}, {transaction: trans});

    const user = await User.findByPk(req.user.id);
    user.role = "Agent";
    await user.save();

    await trans.commit();
    return res.status(201).json({message: "Your request to become a certified Agent has been approved.", agent: saveAgency});
} catch (error) {
    await trans.rollback();
    errorHelper(res, 500, error);
   
}

});

exports.addSavings = asyncHandler(async(req, res) => {
    const trans = await sequelize.transaction();
    const {interval} = req.body;
    const {accountNo} = req.params;
    if(!interval){
        errorHelper(res, 400, "Duration is required");
    }
    if(interval < 1){
        errorHelper(res, 400, "Duration cannot be less than 1");
    }
    if(!accountNo){
        errorHelper(res, 400, "Account Number is required");
    }
    const savingsInfo = await Savings.findOne({where: {accountNo}});
    if(!savingsInfo){
        errorHelper(res, 404, "Invalid Account Number");
    }
    //giving 4% to the agent
    const interest = savingsInfo.amount / 100 * 4;
    const amount = savingsInfo.amount;
    const totalAmount = amount * interval;
   

    //create transaction
    try {
        
    const reference = Math.floor(2781616262 + Math.random() * 927262626262);
    const newTransaction = await Transaction.create({
        amount: totalAmount,
        reference, 
        type: `Target-Savings`,
        method: "Wallet",
        description: `Target Savings for ${accountNo}`,
        status: "Pending",
        userId: req.user.id
    }, {transaction: trans});
    let day_or_month = savingsInfo.start_date;
    for (let index = 1; index < interval; index++) {
        //check if user_savings exist with the savingId
        const user_savings = await User_Savings.findOne({where: {savingId:savingsInfo.id}, 
        order: [['id', 'DESC']]});

        //check if type is Daily or Monthly
        if(savingsInfo.type === 'Daily'){
        if(user_savings){
            day_or_month = user_savings.day_or_month;
            day_or_month.setDate(day_or_month.getDate() + index);
            
        }else{
            day_or_month.setDate(day_or_month.getDate() + 1);
        }
        }else{
            if(user_savings){
                day_or_month = user_savings.day_or_month;
                day_or_month.setMonth(day_or_month.getMonth() + index);
                
            }else{
                day_or_month.setMonth(day_or_month.getMonth() + index);
            }   
        }
            await User_Savings.create({
                userId: savingsInfo.userId,
                agentId: req.user.id,
                amount,
                interest: index,
                type: savingsInfo.type,
                interval: 1,
                day_or_month: day_or_month,
                reference,
                savingId: savingsInfo.id
            }, {transaction: trans})        
    }
    

    await trans.commit();
    return res.status(201).json({transaction: newTransaction, nextdate: day_or_month});
} catch (error) {
        await trans.rollback();
        errorHelper(res, 500, error)
}

});
