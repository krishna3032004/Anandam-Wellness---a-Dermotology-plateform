import connectDB from '@/db/connectDB';
import Doctor from '@/models/Doctor';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
    try {
        await connectDB();

        // const token = await getToken({ req });
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        console.log(token)
        if (!token || !token.email) {
            return new Response(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
            });
        }

        // Get the logged-in doctor from DB
        const doctor = await Doctor.findOne({ email: token.email });

        console.log(doctor)
        
        if (!doctor) {
            return new Response(JSON.stringify({ message: 'Doctor not found' }), {
                status: 404,
            });
        }
        
        // Fetch all users from doctor.paidPatients
        const patients = await User.find({ _id: { $in: doctor.chattedWith } }).select(
            'name email photo username'
        );
        
        console.log(patients)
        return new Response(JSON.stringify(patients), { status: 200 });
    } catch (err) {
        console.error('Error fetching doctor’s patients:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
