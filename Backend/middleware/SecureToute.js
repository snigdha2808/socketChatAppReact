import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";

const SecureToute = async (req, res, next) => {
    console.log('All cookies received:', req.cookies);
    const token = req.cookies.jwt;
    console.log('JWT token from cookie:', token);
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded) {
            return res.status(401).json({message: "Invalid token"});
        }
        const user = await User.findById(decoded.id).select("-password");
        if(!user) {
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error,'error');
        res.status(401).json({message: "Unauthorized"});
    }
}

export default SecureToute;