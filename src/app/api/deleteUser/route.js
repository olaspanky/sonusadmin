// // pages/api/toggleActivation.js
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";

// export async function PUT(req) {
//   try {
//     const { userId } = await req.json();
//     await connectMongoDB();
//     const user = await User.findById(userId);
//     user.isActive = !user.isActive;
//     await user.save();
//     const updatedUsers = await User.find({});
//     return NextResponse.json({ success: true, message: "User activation status updated.", data: updatedUsers }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the user activation status." },
//       { status: 500 }
//     );
//   }
// }

// pages/api/deleteUser.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { userId } = await req.json();
    await connectMongoDB();

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Fetch updated list of users
    const updatedUsers = await User.find({});
    return NextResponse.json(
      { success: true, message: "User and all their data have been deleted.", data: updatedUsers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred while deleting the user." },
      { status: 500 }
    );
  }
}

