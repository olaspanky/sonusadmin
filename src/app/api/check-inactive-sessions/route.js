import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req, res) {
  try {
    await connectMongoDB(); // Ensure MongoDB connection is established

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }

    const users = await User.find({ isLoggedIn: true });
    const now = new Date();

    const updates = users.map(async (user) => {
      const lastActivity = new Date(user.lastActivityTimestamp);
      const diffMinutes = Math.floor((now - lastActivity) / (1000 * 60));

      if (diffMinutes > 10) { // Consider user inactive if no activity for 10 minutes
        await User.updateOne(
          { email: user.email, isLoggedIn: true }, // Ensure isLoggedIn is still true
          {
            $inc: { sessionDuration: diffMinutes },
            $set: {
              isLoggedIn: false,
              logoutTimestamp: now,
            }
          }
        );
      }
    });

    await Promise.all(updates);
    res.status(200).json({ message: "Inactive sessions checked" });
  } catch (error) {
    console.error("Error checking inactive sessions:", error);
    res.status(500).json({ message: "Error checking inactive sessions", error });
  }
}
