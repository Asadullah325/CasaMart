import jwt from 'jsonwebtoken'

const generateAccessToken = async (userId) => {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token
}

export default generateAccessToken

