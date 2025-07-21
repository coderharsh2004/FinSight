// src/utils/sendEmail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // app password or SMTP password
    }
});

export const sendAlertEmail = async (to: string, symbol: string, price: number) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: `📈 Price Alert for ${symbol}`,
        text: `Good news! The stock ${symbol} has reached your target price of $${price}.`,
        html: `<p>📢 <strong>${symbol}</strong> has reached your target price of <strong>$${price}</strong>. Check the markets now!</p>`
    };

    await transporter.sendMail(mailOptions);
};
export default sendAlertEmail;