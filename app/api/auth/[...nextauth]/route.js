

import NextAuth from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from 'mongoose'
import User from '@/models/User'
import Doctor from '@/models/Doctor';
import connectDB from '@/db/connectDB'
import bcrypt from 'bcryptjs'; // ✅ Use bcrypt for password hashing
import { fetchUser, fetchDoctor } from '@/actions/useraction'

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET, // ✅ Required in production
    session: {
        debug: true,
        strategy: 'jwt',
    },
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,  // ✅ Fixed typo (Github_ID -> GITHUB_ID)
        //     clientSecret: process.env.GITHUB_SECRET
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Fetch user from the database
                    let doctor = 0;
                    let user = await fetchUser(credentials.email); // Ensure fetchUser is implemented correctly

                    if (!user) {
                        user = await fetchDoctor(credentials.email); // Ensure fetchUser is implemented correctly
                        doctor = 1;
                    }
                    // Check if the user exists
                    if (!user) {
                        console.error("User not found");
                        // return
                        throw new Error("Invalid Email");
                        // return user
                    }

                    // Validate the password
                    const isPasswordValid = credentials.password === user.password;

                    if (!isPasswordValid) {
                        console.error("Invalid passwordddd");
                        throw new Error("Invalid Password");
                    }

                    // Return a safe user object
                    return {
                        id: user._id.toString(), // Ensure this is a unique identifier
                        email: user.email,
                        password: user.password,
                        name: user.username,
                        doctor: doctor,
                        callbackUrl: "/profile",

                    };
                } catch (error) {
                    console.error("Authorize errorrrrr:", error);
                    throw new Error("Invalid email or password");
                }
            },
        }),

    ],
    callbacks: {
        // async signIn({ user, account, profile }) {
        //     if ( account.provider === "google") {
        //         await connectDB();
        //         const existingUser = await User.findOne({ email: user.email });

        //         if (!existingUser) {
        //             const hashedPassword = await bcrypt.hash("default_password", 10); // ✅ Hash the default password
        //             await User.create({
        //                 email: user.email,
        //                 username: user.email.split("@")[0],
        //                 password: hashedPassword, // ✅ Store hashed password
        //             });
        //         }
        //     }
        //     return true;
        // },
        async session({ session }) {
            await connectDB();
            let doctor=false;
            let dbUser = await User.findOne({ email: session.user.email });
            if (!dbUser) {
                dbUser = await Doctor.findOne({ email: session.user.email });
                doctor=true;
            }
            if (dbUser) {
                session.user.name = dbUser.username;
                session.user.doctor = doctor;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST }