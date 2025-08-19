import User from "../models/UserModels.js";

export const signup = async (req, res) => {
    try{
    const {name, email, password, confirmpassword} = req.body;
    if(password !== confirmpassword){
        return res.status(400).json({message: "Passwords do not match"});
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "Email already exists"});
    }
    const newUser = new User({name, email, password, confirmpassword});
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
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
}