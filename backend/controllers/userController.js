import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user._id);
    res.status(200).json({success:true,token})
} catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
} 
};

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols",
        });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({success:true,token})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
  }
};

export { loginUser, registerUser };
