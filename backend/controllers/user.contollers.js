import sendEmail from "../config/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailtemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const payload = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = await User(payload);
        const savedUser = await newUser.save();

        const verifyUrl = `${process.env.FRONTEND_URL}/verify/${savedUser._id}`

        const verifyEmail = await sendEmail({
            sendTo: savedUser.email,
            subject: "Verify your email",
            html: verifyEmailTemplate({
                name: savedUser.name,
                url: verifyUrl
            })
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: savedUser
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Invalid user",
                success: false
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            verify_email: true
        }, { new: true });

        res.status(200).json({
            message: "Email verified successfully",
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

        if (user.status !== "active") {
            return res.status(400).json({
                message: "User is not active",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user,
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const logoutUser = async (req, res) => {
    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const user = await User.findByIdAndUpdate(userId,{
            status: "inactive",
            refresh_token: ""
        }, { new: true });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
            message: "User logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}