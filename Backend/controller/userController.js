const User = require("../models/UserModels.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    try{
    const {fullname, email, password, confirmpassword} = req.body;
    if(password !== confirmpassword){
        return res.status(400).json({message: "Passwords do not match"});
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "Email already exists"});
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({fullname, email, password: hashedPassword, confirmpassword});
    await newUser.save().then(() => {
        res.status(201).json({message: "User registered successfully", user: newUser});
    }).catch((err) => {
        res.status(500).json({message: "Error creating user", error: err});
    });
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        if(user.password !== password){
            return res.status(400).json({message: "Invalid password"});
        }
        res.status(200).json({message: "Login successful", user: user});
    } catch (error) {
        res.status(500).json({message: "Error during login", error: error});
    }
}

module.exports = { signup, login };