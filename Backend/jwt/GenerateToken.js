import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "30d"});
    res.cookie("jwt", token, {
        httpOnly: true, //xss attack- security feature, prevents the token from being accessed by the browser
        secure: true, 
        sameSite: "strict" //csrf attack- same domain request, prevent cookies from being sent to other domains
    });
};