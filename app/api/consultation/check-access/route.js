import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectDB();
        const { userId, doctorId } = await req.json();

        const user = await User.findById(userId);

        const hasAccess = user?.paidDoctors?.includes(doctorId);

        if (hasAccess) {
            return new Response("Access granted", { status: 200 });
        } else {
            return new Response("Access denied", { status: 403 });
        }
    } catch (error) {
        console.error("Error in access check:", error);
        return new Response("Server error", { status: 500 });
    }
}
