// src/app/api/checkUserStatus/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  try {
    await connectMongoDB();
    const token = await getToken({ req, secret });

    if (!token) {
      console.error("No active session found.");
      return NextResponse.json(
        { success: false, message: "No active session found." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      console.error("User not found.");
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, isActive: user.isActive },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking user status:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while checking user status.", error: error.message },
      { status: 500 }
    );
  }
}
