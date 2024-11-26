const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');


const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({
                success : false,
                message : "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email, 
            password : hashedPassword
        })
        if(user){
            return res.status(201).json({
                success : true,
                message : "User registered successfully",
                user : user,
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid Email or password", // hacker can't guess what is incorrect email or password
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success : false,
                message : "Invalid Email or password", // hacker can't guess what is incorrect email or password
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`);
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}

module.exports = {register, login};
