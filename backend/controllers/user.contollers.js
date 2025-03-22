import sendEmail from "../config/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailtemplate.js";

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