import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const generateRefreshToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH, { expiresIn: '30d' });

    await User.findByIdAndUpdate(userId, { refresh_token: token }, { new: true });


    return token
}

export default generateRefreshToken