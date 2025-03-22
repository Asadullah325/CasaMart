const forgetPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="background-color: #f2f2f2; padding: 20px; width: 600px; margin: 0 auto; text-align: center;">
    <h1>Verify Your Email</h1>
    <p>Hi ${name},</p>
    <p>You have requested to reset your password</p>
    <p>Your OTP is ${otp}</p>
    </div>
    `
}

export default forgetPasswordTemplate