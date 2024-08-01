// cron/autoSignOut.js

import cron from 'node-cron';
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

async function signOutInactiveUsers() {
  await connectMongoDB();

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const inactiveUsers = await User.find({ lastActivity: { $lt: oneHourAgo }, isLoggedIn: true });

  for (const user of inactiveUsers) {
    await User.updateOne({ _id: user._id }, { isLoggedIn: false });
  }

  console.log(`${inactiveUsers.length} users have been signed out due to inactivity.`);
}

// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
  console.log('Checking for inactive users...');
  signOutInactiveUsers();
});

export default signOutInactiveUsers;
