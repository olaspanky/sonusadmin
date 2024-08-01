// // import { connectMongoDB } from "@/lib/mongodb";
// // import User from "@/models/user";
// // import { NextResponse } from 'next/server';

// // export async function POST(req) {
// //   const { email, timeSpent } = await req.json();

// //   try {
// //     await connectMongoDB();

// //     const user = await User.findOne({ email });

// //     if (user) {
// //       const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

// //       const sessionIndex = user.dailySessions.findIndex(session => session.date === today);

// //       if (sessionIndex !== -1) {
// //         // Update the timeSpent for today's session
// //         user.dailySessions[sessionIndex].timeSpent += Number(timeSpent);
// //       } else {
// //         // Add a new session entry for today
// //         user.dailySessions.push({ date: today, timeSpent: Number(timeSpent) });
// //       }

// //       await user.save();
// //       return NextResponse.json({ message: "Daily session updated successfully" }, { status: 200 });
// //     } else {
// //       return NextResponse.json({ message: "User not found" }, { status: 404 });
// //     }
// //   } catch (error) {
// //     console.error('Error updating daily session: ', error);
// //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// //   }
// // }

// // export function handler(req) {
// //   if (req.method === 'POST') {
// //     return POST(req);
// //   } else {
// //     return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
// //   }
// // }


// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   const { email, timeSpent } = await req.json();

//   try {
//     await connectMongoDB();

//     const user = await User.findOne({ email });

//     if (user) {
//       const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

//       const sessionIndex = user.dailySessions.findIndex(session => session.date === today);

//       if (sessionIndex !== -1) {
//         // Update the timeSpent for today's session
//         user.dailySessions[sessionIndex].timeSpent = Number(timeSpent);
//       } else {
//         // Add a new session entry for today
//         user.dailySessions.push({ date: today, timeSpent: Number(timeSpent) });
//       }

//       await user.save();
//       return NextResponse.json({ message: "Daily session updated successfully" }, { status: 200 });
//     } else {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error updating daily session: ', error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

// export function handler(req) {
//   if (req.method === 'POST') {
//     return POST(req);
//   } else {
//     return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
//   }
// }
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, timeSpent } = await req.json();

  try {
    await connectMongoDB();

    const user = await User.findOne({ email });

    if (user) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      const sessionIndex = user.dailySessions.findIndex(session => session.date === today);

      if (sessionIndex !== -1) {
        // Update the timeSpent for today's session by adding the new timeSpent
        user.dailySessions[sessionIndex].timeSpent += Number(timeSpent);
      } else {
        // Add a new session entry for today
        user.dailySessions.push({ date: today, timeSpent: Number(timeSpent) });
      }

      await user.save();
      return NextResponse.json({ message: "Daily session updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating daily session: ', error);
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
