import sendEmail from "../config/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyEmailTemplate from "../utils/verifyEmailtemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";
import generateOTP from "../utils/generateOTP.js";
import forgetPasswordTemplate from "../utils/forgetPasswordTemplate.js";

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

        const updateUser = await User.findByIdAndUpdate(user._id, {
            last_login: Date.now()
        }, { new: true });

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
            updateUser,
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

        const user = await User.findByIdAndUpdate(userId, {
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

export const uploadUserImage = async (req, res) => {
    try {

        const userId = req.userId;

        const image = req.file;

        if (!image) {
            return res.status(400).json({
                message: "Image is required",
                success: false
            });
        }

        const upload = await uploadImageCloudinary(image);

        const user = await User.findByIdAndUpdate(userId, {
            avatar: upload.secure_url
        }, { new: true });

        res.status(200).json({
            message: "Image uploaded successfully",
            success: true,
            data: {
                avatar: upload.secure_url,
                public_id: upload.public_id,
                userId: user._id
            }
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const updateDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        let hashedPassword = ""

        if (password) {
            hashedPassword = await bcrypt.hash(password, 12);
        }

        const updateUser = await User.updateOne({ _id: userId }, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(password && { password: hashedPassword }),
        }, { new: true });

        res.status(200).json({
            message: "User updated successfully",
            success: true, data: updateUser
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const OTP = await generateOTP();
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

        const updateUser = await User.findOneAndUpdate({ _id: user._id }, {
            forget_password_otp: OTP,
            forget_password_otp_expiry: expiryTime
        });

        await sendEmail({
            sendTo: email,
            subject: "Forgot Password OTP",
            html: forgetPasswordTemplate({
                name: user.name,
                otp: OTP
            })
        });

        res.status(200).json({
            message: "OTP sent successfully",
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

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP is required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const currentTime = new Date();

        if (user.forget_password_otp_expiry < currentTime) {
            return res.status(400).json({
                message: "OTP expired",
                success: false
            });
        }

        if (user.forget_password_otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false
            });
        }

        res.status(200).json({
            message: "OTP verified successfully",
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

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updateUser = await User.findOneAndUpdate({ _id: user._id }, {
            password: hashedPassword,
            forget_password_otp: null,
            forget_password_otp_expiry: null
        });

        res.status(200).json({
            message: "Password reset successfully",
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

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies || req?.headers?.authorization?.split("Bearer ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

        if (!verifyToken) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const newAccessToken = await generateAccessToken(verifyToken.userId);

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "none",
            secure: true
        });

        res.status(200).json({
            message: "Token refreshed successfully",
            success: true,
            accessToken: newAccessToken
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId }).select("-password -refresh_token");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}
