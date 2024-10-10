import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const loginUser = async (req , res) => {

}

export const registerUser = async (req , res) => {
    try {
        const {fullName , username , password , confirmPassword , gender} = req.body;

        if(password!== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        const user = await User.findOne({ username });
        
        if(user){
            return res.status(400).json({ message: "Username already exists!" });
        }

        const boyPofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male"? boyPofilePic : girlPofilePic
        });

        if(newUser){
            // Generate JWT token
            await newUser.save();

            
            return res.status(201).json({
                 message: "User created successfully!" , 
                 user:{
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            }
        });
        }else{
            return res.status(400).json({ message: "Invalid registration data!" });
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error!" });
    }
}

export const logoutUser = (req , res) => {
    // Code to handle logout logic goes here
    res.status(200).json({ message: "User logged out successfully!" });
}