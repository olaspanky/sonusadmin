// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function PUT(req) {
//   try {
//     const { userId, newPassword } = await req.json();
//     await connectMongoDB();
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(userId, { password: hashedPassword });
//     return NextResponse.json({ success: true, message: "Password updated." }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the password." },
//       { status: 500 }
//     );
//   }
// }


import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    const { userId, newPassword } = await req.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword, isLoggedIn: false });
    return NextResponse.json({ success: true, message: "Password updated and user logged out." }, { status: 200 });
  } catch (error) {
    console.error("Error updating password and logging out user:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the password." },
      { status: 500 }
    );
  }
}
