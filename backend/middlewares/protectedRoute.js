import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({ message: "unauthorized access" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(401).json({ message: "unauthorized access" });
        }
        const user = await User.findById(decodedToken.userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "User NotFound" });
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "unauthorized access" });
    }
}

export default protectedRoute;