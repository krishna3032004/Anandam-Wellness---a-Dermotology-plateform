"use server"
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
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

export const toggleDoctorLiveStatus = async (email, doctorId, makeLive) => {
    try {
        await connectDB();

        const updated = await Doctor.findByIdAndUpdate(
            doctorId,
            { live: makeLive },
            { new: true }
        ).select("_id username live");

        if (makeLive == true) {
            await sendDoctorLiveApprovedEmail(email)
        } else {
            await sendDoctorLiveRejectedEmail(email)
        }
        return JSON.parse(JSON.stringify(updated));
    } catch (err) {
        console.error("Error toggling doctor live status:", err);
        return null;
    }
};

export const sendDoctorLiveRejectedEmail = async (doctorEmail) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: doctorEmail,
        subject: "Your Profile is Not Live Yet - Action Required",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <p>Dear Doctor,</p>
          <p>We regret to inform you that your profile is currently <strong>not live</strong> on the Anandam Wellness platform.</p>
          <p>Please ensure your profile is <strong>complete, accurate, and professional</strong> before resubmitting.</p>
          <p>Make sure to add a clear photo, correct expertise, and an appropriate description.</p>
          <p>Once updated, our team will review it again.</p>
          <p>Regards,<br />Team Anandam Wellness</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
};


export const sendDoctorLiveApprovedEmail = async (doctorEmail) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: doctorEmail,
        subject: "Your Profile is Now Live on Anandam Wellness",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <p>Dear Doctor,</p>
          <p>We are pleased to inform you that your profile has been <strong>approved</strong> and is now <strong>live</strong> on the Anandam Wellness platform.</p>
          <p>Patients can now discover and book consultations with you.</p>
          <p>Thank you for being a part of Anandam Wellness!<br />Team Anandam Wellness</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
};



export const getAllDoctors = async () => {
    try {
        await connectDB();

        const doctors = await Doctor.find().select(
            "_id username email rating age expertise live photo specialty gender patientStories onlineFee physicalFee location licenseNumber experience degree clinicName"
        );

        return JSON.parse(JSON.stringify(doctors));
    } catch (err) {
        console.error("Error fetching all doctors:", err);
        return [];
    }
};

export const getDoctorAll = async (skip = 0, limit = 20) => {
    try {
        await connectDB();

        const doctors = await Doctor.find({ live: true })
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ rating: -1 }); // optional sort

        const totalCount = await Doctor.countDocuments();

        const plainDoctors = JSON.parse(JSON.stringify(doctors));

        return { plainDoctors, hasMore: skip + limit < totalCount };
    } catch (error) {
        console.error("Error fetching all doctors:", error);
        return { doctors: [], hasMore: false };
    }
};



export const getDoctorsByExpertise = async (expertise, skip = 0, limit = 20) => {
    try {
        await connectDB();
        //   console.log(expertise)

        const doctors = await Doctor.find({
            expertise: { $in: [new RegExp(expertise, "i")] },
            live: true,
        })
            .select("-password") // Exclude password
            .skip(skip)
            .limit(limit);

        // const doctor2 = doctors1.toObject({ flattenObjectIds: true })
        const plainDoctors = JSON.parse(JSON.stringify(doctors));
        console.log(plainDoctors)

        const totalCount = await Doctor.countDocuments({
            expertise: { $in: [new RegExp(expertise, "i")] },
        });

        return { plainDoctors, hasMore: skip + limit < totalCount };
    } catch (err) {
        console.error(err);
        return { doctors: [], hasMore: false };
    }
};




const bufferToBase64 = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString("base64")}`;
};







export const getuserProfileFromDB = async (email) => {
    try {
        await connectDB();

        if (!email) {
            throw new Error("Email is required to fetch doctor profile.");
        }

        const a = await User.findOne({ email });

        const user = a.toObject({ flattenObjectIds: true })
        return user || null;
    } catch (error) {
        console.error("Error fetching doctor profile:", error.message);
        return null;
    }
};
export const getDoctorProfileFromDB = async (email) => {
    try {
        await connectDB();

        if (!email) {
            throw new Error("Email is required to fetch doctor profile.");
        }

        const a = await Doctor.findOne({ email });

        const doctor = a.toObject({ flattenObjectIds: true })
        return doctor || null;
    } catch (error) {
        console.error("Error fetching doctor profile:", error.message);
        return null;
    }
};

export const updateProfilefull = async (userData) => {
    await connectDB();
    // console.log(data)
    const email = userData.email;
    // if (!email) throw new Error("Unauthorized");

    let photoUrl = "";

    if (userData.photo && typeof userData.photo !== "string") {
        const base64Image = await bufferToBase64(userData.photo);
        const uploadRes = await cloudinary.uploader.upload(base64Image, {
            folder: "user_profiles",
        });
        photoUrl = uploadRes.secure_url;
    } else {
        photoUrl = userData.photo || "";
    }

    const updateduser = await User.findOneAndUpdate(
        { email },
        {
            ...userData,
            email,
            photo: photoUrl,
        },
        { upsert: true, new: true }
    );

    const updateduser2 = updateduser.toObject({ flattenObjectIds: true })
    return { success: true, data: updateduser2 };
    // await User.updateOne({ email: data.email }, data);
};

export async function saveDoctorProfile(doctorData) {
    await connectDB();

    // const session = await getServerSession(authOptions);
    // const email = session?.user?.email;
    const email = doctorData.email;
    // if (!email) throw new Error("Unauthorized");

    let photoUrl = "";

    if (doctorData.photo && typeof doctorData.photo !== "string") {
        const base64Image = await bufferToBase64(doctorData.photo);
        const uploadRes = await cloudinary.uploader.upload(base64Image, {
            folder: "doctor_profiles",
        });
        photoUrl = uploadRes.secure_url;
    } else {
        photoUrl = doctorData.photo || "";
    }

    const updatedDoctor = await Doctor.findOneAndUpdate(
        { email },
        {
            ...doctorData,
            email,
            photo: photoUrl,
        },
        { upsert: true, new: true }
    );

    const updatedDoctor2 = updatedDoctor.toObject({ flattenObjectIds: true })
    return { success: true, data: updatedDoctor2 };
}


// export const saveDoctorProfile = async (doctorData) => {
//     try {
//       await connectDB();    

//       if (!doctorData.email) {
//         throw new Error("Email is required to identify the doctor.");    
//       }

//       // Find doctor by email and update if exists, else create new
//       const updatedDoctor = await Doctor.findOneAndUpdate(
//         { email: doctorData.email },    
//         { $set: doctorData },
//         { new: true, upsert: true } // upsert = insert if not found
//       );

//       return {
//         success: true,    
//         message: "Doctor profile saved successfully.",
//         doctor: updatedDoctor,
//       };
//     } catch (error) {
//       console.error("Error saving doctor profile:", error);    
//       return {
//         success: false,    
//         message: "Failed to save doctor profile.",
//         error: error.message,
//       };
//     }
//   };




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
export const sendUserNewEmail = async (email) => {
    // verificationToken = crypto.randomBytes(3).toString("hex");
    // console.log(verificationToken)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_ADMIN,
        subject: "Doctor Profile Update - Action Required",
        html: `
            <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
                <p>Dear Admin,</p>
                <p><strong>${email}</strong> has recently updated their profile on the Anandam Wellness platform.</p>
                <p>Please review the updated profile and take necessary action if required.</p>
                <p>Thank you,<br />Anandam Wellness Team</p>
            </div>
        `,
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
export const fetchDoctorbyid = async (id) => {
    await connectDB();
    let a = await Doctor.findOne({ _id: id });
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
    if (!a) {
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





export const initiatepayment = async (amount, email) => {
    // export const initiatepayment = async (amount, email, form) => {
    await connectDB()

    // let add = `${form.address} ,${form.city} ${form.state} ${form.postalCode}`
    const id = process.env.NEXT_PUBLIC_KEY_ID
    const Secret = process.env.NEXT_PUBLIC_KEY_SECRET

    var instance = new Razorpay({ key_id: id, key_secret: Secret })
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR"
    }
    let x = await instance.orders.create(options)
    // await Payment.create({ oid: x.id, amount: amount, email: email, address: add, phone: form.phone, name: form.name })
    return x;
}