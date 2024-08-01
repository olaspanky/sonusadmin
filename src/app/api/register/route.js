// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connectMongoDB();
//     await User.create({ name, email, password: hashedPassword });

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { name, email, password, company, subscription } = await req.json();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connectMongoDB();
    
//     // Create a new user with isLoggedIn set to false by default
//     await User.create({ name, email, password: hashedPassword, company, subscription, isLoggedIn: false,   });

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, company, role, subscription, deviceId, browserName, deviceName, deviceDevice, sessionDuration, dailySessions    } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    
    // Create a new user with isLoggedIn set to false by default
    await User.create({ name, email, password: hashedPassword, company, deviceId, role,browserName, deviceName, deviceDevice, subscription, sessionDuration,dailySessions, isLoggedIn: false, isActive: true });

    return NextResponse.json({ success: true, message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
