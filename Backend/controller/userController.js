import mongoose from "mongoose";
import User from "../models/UserModels.js";
import Conversation from "../models/ConversationModel.js";
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
        const loggedInUserId = req.user._id;
        // Find all conversations where the logged-in user is a participant
        const conversations = await Conversation.find({
            participants: { $in: [loggedInUserId] }
        });
        
        const conversationUserIds = new Set();
        conversations.forEach(conversation => {
            conversation.participants.forEach(participantId => {
                if (participantId.toString() !== loggedInUserId.toString() && 
                    mongoose.Types.ObjectId.isValid(participantId)) {
                    conversationUserIds.add(participantId.toString());
                    console.log('Added valid participant ID:', participantId);
                } else {
                    console.log('Skipped participant ID:', participantId, 'Reason: Same as logged in user or invalid ObjectId');
                }
            });
        });
            
            console.log('Final conversationUserIds Set:', conversationUserIds);
        const userIdsArray = Array.from(conversationUserIds);
        console.log('Final userIdsArray:', userIdsArray);
        
        // Get user details for all conversation participants
        let filteredUsers = [];
        if (userIdsArray.length > 0) {
            filteredUsers = await User.find({
                _id: { $in: userIdsArray }
            }).select("-password");
        }
        
        res.status(200).json({
            filteredUsers,
            totalConversations: conversations.length,
            message: "Users retrieved successfully"
        });
    } catch (error) {
        console.log(error, 'getUserProfile');
        res.status(500).json({message: "Error during get user profile", error: error.message});
    }
}

const getAvailableUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log(loggedInUserId, 'loggedInUserId');
        
        // Find all conversations where the logged-in user is a participant
        const conversations = await Conversation.find({
            participants: { $in: [loggedInUserId] }
        });
        
        // Extract user IDs from conversations
        const conversationUserIds = new Set();
        conversations.forEach(conversation => {
            conversation.participants.forEach(participantId => {
                // Validate that participantId is actually a valid user ID (not a message ID)
                if (participantId.toString() !== loggedInUserId.toString() && 
                    mongoose.Types.ObjectId.isValid(participantId)) {
                    conversationUserIds.add(participantId.toString());
                }
            });
        });
        
        // Get users who are NOT in conversations with the logged-in user
        const availableUsers = await User.find({
            _id: { 
                $nin: [loggedInUserId, ...Array.from(conversationUserIds)]
            }
        }).select("-password");

        console.log('availableUsers', availableUsers);
        
        res.status(200).json({
            availableUsers,
            totalAvailable: availableUsers.length,
            message: "Available users retrieved successfully"
        });
    } catch (error) {
        console.log(error, 'getAvailableUsers');
        res.status(500).json({message: "Error getting available users", error: error});
    }
}

export { signup, login, logout, getUserProfile, getAvailableUsers };