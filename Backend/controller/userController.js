import User from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../jwt/GenerateToken.js";

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
    const newUser = await new User({
        fullname,
        email,
        password: hashedPassword
    });
    await newUser.save();
    if(newUser){
        generateToken(newUser._id, res);
        res.status(201).json({message: "User registered successfully", user:{
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email
        }});
    }
    else{
        res.status(500).json({message: "Error creating user"});
    }
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({message: "Invalid username or password"});
        }
        generateToken(user._id, res);
        res.status(201).json({message: "Login successful", user : {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error during login", error: error});
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {httpOnly: true, expires: new Date(0)});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({message: "Error during logout", error: error});
    }
}

const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        res.status(200).json({filteredUsers});
    } catch (error) {
        console.log(error,'allUsers');
        res.status(500).json({message: "Error during get user profile", error: error});
    }
}

export { signup, login, logout, getUserProfile };