// pages/api/updatePasswordByEmail.js

// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function PUT(req) {
//   try {
//     const { email, newPassword } = await req.json();
//     await connectMongoDB();

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password and set isLoggedIn to false
//     await User.findByIdAndUpdate(user._id, { password: hashedPassword, isLoggedIn: false });

//     return NextResponse.json({ success: true, message: "Password updated and user logged out." }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating password and logging out user:", error);
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the password." },
//       { status: 500 }
//     );
//   }
// }


import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function PUT(req, res) {
  try {
    const { email, newPassword } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found.' }), { status: 404 });
    }

    const isPasswordUsed = await Promise.all(
      user.previousPasswords.map(async (prev) => {
        return await bcrypt.compare(newPassword, prev.password);
      })
    );

    if (isPasswordUsed.some(match => match)) {
      return new Response(JSON.stringify({ message: 'Password has been used before.' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.previousPasswords.push({ password: user.password });
    user.password = hashedPassword;
    await user.save();
    await User.findByIdAndUpdate(user._id, { isLoggedIn: false });


    return new Response(JSON.stringify({ success: true, message: 'Password updated and user logged out.' }), { status: 200 });
  } catch (error) {
    console.error('Error updating password:', error);
    return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
  }
}
