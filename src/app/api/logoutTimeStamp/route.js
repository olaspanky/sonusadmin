import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, isLoggedIn } = req.body;

    try {
      await connectMongoDB();
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const now = new Date();
      const sessionDuration = user.loginTimestamp ? now - new Date(user.loginTimestamp) : 0;
      const totalSessionDuration = user.sessionDuration + sessionDuration;

      await User.updateOne(
        { email },
        { isLoggedIn: isLoggedIn, logoutTimestamp: now, sessionDuration: totalSessionDuration }
      );

      res.status(200).json({ message: "Logout timestamp and session duration updated." });
    } catch (error) {
      console.error("Error updating logout timestamp: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
