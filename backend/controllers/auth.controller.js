export const loginUser = async (req , res) => {
    try {
        const {fullName , username , password , confirmPassword , gender} = req.body;
    } catch (error) {
        
    }
}

export const registerUser = (req , res) => {
    // Code to handle registration logic goes here
    res.status(200).json({ message: "User registered successfully!" });
}

export const logoutUser = (req , res) => {
    // Code to handle logout logic goes here
    res.status(200).json({ message: "User logged out successfully!" });
}