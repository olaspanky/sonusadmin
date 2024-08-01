
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, timeSpent } = await req.json();

  try {
    await connectMongoDB();

    const user = await User.findOne({ email });

    if (user) {
      user.sessionDuration = (user.sessionDuration || 0) + Number(timeSpent);
      await user.save();
      return NextResponse.json({ message: "Session updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating session: ', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export function handler(req) {
  if (req.method === 'POST') {
    return POST(req);
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}
