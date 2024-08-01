import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connectMongoDB();

    try {
      const users = await User.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$loginTimestamp" },
            },
            logins: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            date: "$_id",
            logins: 1,
          },
        },
      ]);

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching user activity data:", error); // Log the error
      res.status(500).json({ message: "Error fetching user activity data" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
