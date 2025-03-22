const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="background-color: #f2f2f2; padding: 20px; width: 600px; margin: 0 auto; text-align: center;">
    <h1>Verify Your Email</h1>
    <p>Hi ${name},</p>
    <p>Thanks for signing up. Please verify your email by clicking the link below.</p>
    <a href=${url} style="background-color: #4CAF50; border: none; color: white; padding: 10px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Verify Email</a>
    </div>
    `
}

export default verifyEmailTemplate