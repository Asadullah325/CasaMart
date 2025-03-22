import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const { accessToken } = req.cookies || req?.headers?.authorization?.split("Bearer ")[1];

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        req.userId = decoded.userId
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export default authMiddleware