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
        const user = await User.findOne({ email: token.email });

        // console.log(doctor)
        
        if (!user) {
            return new Response(JSON.stringify({ message: 'Doctor not found' }), {
                status: 404,
            });
        }
        
        // Fetch all users from doctor.paidPatients
        const doctors = await Doctor.find({ _id: { $in: user.paidDoctors } });
        // const doctors = await Doctor.find({ _id: { $in: user.paidDoctors } }).select("username photo");
        
        // console.log(patients)
        return new Response(JSON.stringify(doctors), { status: 200 });
    } catch (err) {
        console.error('Error fetching doctor’s patients:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
