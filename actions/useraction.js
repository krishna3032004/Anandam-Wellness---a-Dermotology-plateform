"use server"
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import nodemailer from "nodemailer";
import crypto from "crypto";
let verificationToken
export const registerUser = async (email, isDoctor) => {
    await connectDB();
    let existingUser
    existingUser = await User.findOne({ email });

    if (!existingUser) {
        existingUser = await Doctor.findOne({ email });
    }
    if (existingUser) {
        return "User already exists";
    }
    await sendVerificationEmail(email);
    return true;
};

export const sendVerificationEmail = async (email) => {
    verificationToken = crypto.randomBytes(3).toString("hex");
    console.log(verificationToken)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification Code",
        html: `<div><div className="text-xs">Hi ,</div><div className="text-xs">Go back to the site and enter this code to confirm your email.</div><h1>Email Verification Code: ${verificationToken}</h1></div>`,
    };
    await transporter.sendMail(mailOptions);
};




export const verify = async (email, password) => {
    await connectDB();
    let user = await fetchUser(email);
    if (!user) {
        user = await fetchDoctor(email);
    }
    if (!user) {
        return "Invalid Email!";
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
        return "Invalid Password!";
    }
    return false;
};


export const confirmcode = async (code) => {
    console.log(code)
    console.log(verificationToken)
    if (code === verificationToken) {
        return true
    }
    return false
}


export const createUser = async (email, password, username) => {
    await connectDB();
    await User.create({ email: email, password: password, username: username });
};
export const createDoctor = async (email, password, username, license, specialization, clinic) => {
    await connectDB();
    await Doctor.create({ email: email, password: password, username: username, specialization: specialization });
};

export const fetchUser = async (email) => {
    await connectDB();
    let a = await User.findOne({ email: email });
    if (a == null) {
        return a;
    }
    return a.toObject({ flattenObjectIds: true });
};
export const fetchDoctor = async (email) => {
    await connectDB();
    let a = await Doctor.findOne({ email: email });
    if (a == null) {
        return a;
    }
    return a.toObject({ flattenObjectIds: true });
};






export const resetPassword = async (email) => {
    await connectDB();
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
        existingUser = await Doctor.findOne({ email });

    }
    if (!existingUser) {
        return "User don't exists";
    }
    await sendotpforforgoting(email);
    return true;
};

export const updateProfile = async (email, password) => {
    await connectDB();
    let a = await User.updateOne({ email: email }, { password: password });
    if(!a){
        let a = await Doctor.updateOne({ email: email }, { password: password });

    }
};

export const sendotpforforgoting = async (email) => {

    verificationToken = crypto.randomBytes(3).toString("hex");


    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // User's email
        subject: "Password Reset Code",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #4CAF50;">Reset Your Password</h2>
            </div>
            <p>Hi,</p>
            <p>We received a request to reset your password. If this was not you, please ignore this email.</p>
            <p>To reset your password, please use the following code:</p>
            <div style="text-align: center; margin: 20px 0;">
                <h1 style="background: #f9f9f9; padding: 10px 20px; border: 1px solid #ddd; display: inline-block; border-radius: 4px; color: #4CAF50;">
                    ${verificationToken}
                </h1>
            </div>
            <p>If you need further assistance, feel free to contact our support team.</p>
            <br>
            <p>Thanks,</p>
            <p>Your Company Team</p>
        </div>
        `,
    };
    await transporter.sendMail(mailOptions);

};