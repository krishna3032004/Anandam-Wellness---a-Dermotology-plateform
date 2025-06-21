import connectDB from '@/db/connectDB';
// import connectDB from '@/db/connectDB';
import User from '@/models/User';
import Doctor from '@/models/Doctor';

export async function POST(req) {
  try {
    await connectDB();
    const { userId, doctorId } = await req.json();

    // const user = await User.findById(userId);
    // const doctor = await Doctor.findById(doctorId);

    await User.findByIdAndUpdate(userId, {
        $addToSet: { paidDoctors: doctorId }
      });
      
      await Doctor.findByIdAndUpdate(doctorId, {
        $addToSet: { chattedWith: userId }
      });
    // console.log(user)
    // console.log(doctor)
    // // Update user.chattedWith
    // if (!user.paidDoctors.includes(doctorId)) {
    //   user.paidDoctors.push(doctorId);
    //   await user.save();
    // }

    // // Update doctor.chattedWith
    // if (!doctor.chattedWith.includes(userId)) {
    //   doctor.chattedWith.push(userId);
    //   await doctor.save();
    // }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error updating chat history:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
