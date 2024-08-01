

// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password, deviceId, browserName, deviceName, deviceDevice } = credentials;

//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             throw new Error("User not found");
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (!passwordsMatch) {
//             throw new Error("Invalid credentials");
//           }

//           // Check if user is already logged in on another device
//           if (user.isLoggedIn) {
//             throw new Error(`You are already logged in on a ${user.deviceName} ${user.deviceDevice} ${user.browserName} browser.  Please logout from it to continue.`);
//           }

//           await User.updateOne(
//             { email },
//             {
//               deviceId,
//               browserName,
//               deviceName,
//               deviceDevice,
//               isLoggedIn: true,
//               loginTimestamp: new Date(), // Update loginTimestamp here
//             }
//           );

//           return { ...user.toObject(), deviceId, browserName, deviceName };
//         } catch (error) {
//           console.log("Error in authorize function: ", error);
//           throw new Error(error.message); // Ensure error message is passed correctly
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user._id,
//           subscription: user.subscription,
//           role: user.role,
//           deviceId: user.deviceId,
//           browserName: user.browserName,
//           deviceName: user.deviceName,
//           deviceDevice: user.deviceDevice,
//           sessionDuration: user.sessionDuration,
//           dailySessions: user.dailySessions
//         };
//       }
//       return token;
//     },
//     async session({ token, session }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           subscription: token.subscription,
//           role: token.role,
//           deviceId: token.deviceId,
//           browserName: token.browserName,
//           deviceName: token.deviceName,
//           deviceDevice: token.deviceDevice,
//           sessionDuration: token.sessionDuration,
//           dailySessions: token.dailySessions

//         },
//       };
//     },
//     async signOut({ token }) {
//       try {
//         await connectMongoDB();
//         await User.updateOne(
//           { email: token.email },
//           { deviceId: null, browserName: null, deviceName: null, deviceDevice: null, isLoggedIn: false }
//         );
//       } catch (error) {
//         console.error("Error logging out: ", error);
//       }
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, deviceId, browserName, deviceName, deviceDevice } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Invalid credentials");
          }

          // Check if user is already logged in on another device
          if (user.isLoggedIn) {
            throw new Error(`You are already logged in on a ${user.deviceName} ${user.deviceDevice} ${user.browserName} browser.  Please logout from it to continue.`);
          }

          // Initialize dailySessions if it doesn't exist
          if (!user.dailySessions || user.dailySessions.length === 0) {
            user.dailySessions = [
              {
                date: new Date().toISOString().split('T')[0], // today's date as string
                timeSpent: 0, // initialize time spent to 0
              },
            ];
          }

          await User.updateOne(
            { email },
            {
              deviceId,
              browserName,
              deviceName,
              deviceDevice,
              isLoggedIn: true,
              loginTimestamp: new Date(), // Update loginTimestamp here
              dailySessions: user.dailySessions, // Ensure dailySessions is saved
            }
          );

          return { ...user.toObject(), deviceId, browserName, deviceName };
        } catch (error) {
          console.log("Error in authorize function: ", error);
          throw new Error(error.message); // Ensure error message is passed correctly
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          subscription: user.subscription,
          role: user.role,
          deviceId: user.deviceId,
          browserName: user.browserName,
          deviceName: user.deviceName,
          deviceDevice: user.deviceDevice,
          sessionDuration: user.sessionDuration,
          dailySessions: user.dailySessions
        };
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          subscription: token.subscription,
          role: token.role,
          deviceId: token.deviceId,
          browserName: token.browserName,
          deviceName: token.deviceName,
          deviceDevice: token.deviceDevice,
          sessionDuration: token.sessionDuration,
          dailySessions: token.dailySessions

        },
      };
    },
    async signOut({ token }) {
      try {
        await connectMongoDB();
        await User.updateOne(
          { email: token.email },
          { deviceId: null, browserName: null, deviceName: null, deviceDevice: null, isLoggedIn: false }
        );
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
