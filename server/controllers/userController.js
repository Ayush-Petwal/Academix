const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');
const { deleteMedia, uploadMedia } = require('../utils/cloudinary');


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

const logout = async ( _ , res) => {
    try{
        return res.status(200).cookie('token', "", {
            maxAge : 0
        }).json({
            success : true,
            message : "Logged out successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        }) 
    }
}
const getUserProfile = async (req, res) => {
    try{
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found",
            })
        }
        return res.status(200).json({
            success : true,
            user : user,
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}
const updateProfile = async (req, res) => {
    try{
        const userId = req.id;
        const {name} = req.body;
        const {profilePhoto} = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found",
            })
        }
        //extract photoUrl of old photo from url is it exists
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract publicId from url
            deleteMedia(publicId)
        }

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const {secure_url : photoUrl} = cloudResponse;

        const updatedData = {name , photoUrl}
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new : true}).select("-password");
        if(!updatedUser){
            return res.status(400).json({
                success : false,
                message : "User not found",
            })
        }
        return res.status(200).json({
            success : true,
            user : updatedUser,
            message : "Profile updated successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}
module.exports = {register, login, logout, getUserProfile, updateProfile};
