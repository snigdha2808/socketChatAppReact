import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "30d"});
    res.cookie("jwt", token, {
        httpOnly: true, //xss attack- security feature, prevents the token from being accessed by the browser
        secure: false, // Set to false for localhost development (HTTP)
        sameSite: "lax", // More permissive for development
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });
};