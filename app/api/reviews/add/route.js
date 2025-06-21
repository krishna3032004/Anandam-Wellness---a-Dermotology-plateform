import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
import connectDB from "@/db/connectDB";
import Doctor from "@/models/Doctor";

export async function POST(req) {
  try {
    await connectDB();

    const {
      doctorId,
      userId,
      title,
      rating,
      recommended,
      tags,
      comment,
    } = await req.json();

    if (!doctorId || !userId || !title || !tags || !tags.length || rating == null || recommended == null) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newReview = {
      userId,
      title,
      date: new Date().toISOString(),
      rating,
      recommended,
      tags,
      comment: comment || "",
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { reviews: newReview } },
      { new: true }
    );

    if (!updatedDoctor) {
      return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });
    }

    const totalRatings = updatedDoctor.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    const avgRating = totalRatings / updatedDoctor.reviews.length;
    console.log(avgRating)

    // 3. Update doctor rating field
    updatedDoctor.rating = parseFloat(avgRating.toFixed(1)); // rounded to 1 decimal
    await updatedDoctor.save();

    return NextResponse.json({ success: true, message: "Review added", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
