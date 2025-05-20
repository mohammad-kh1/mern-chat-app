import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req , res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user?.password || "");
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({ message: "Logged in successfully!" , user:{
            id:user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        } });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error!" });
    }
}

export const registerUser = async (req , res) => {
    try {
        const {fullName , username , password , confirmPassword , gender} = req.body;
	console.log(req.body);
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
            profilePic: gender === "male"? boyPofilePic : girlPofilePic
        });

        if(newUser){
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();


            return res.status(201).json({
                 message: "User created successfully!" , 
                 user:{
                    id:user._id,
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
    try {
        res.cookie("token" , "" , { expires: new Date(0) ,maxAge: 0 }).json({message: "Logged out successfully!"  }).status(200);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error!" });
    }
}
