import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    // Triggered after successful sign-in
    async signIn({ profile, account }) {
      await connectToDB();

      try {
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture || profile.avatar_url,
            provider: account.provider,
          });
        }
        return true;
      } catch (err) {
        console.log("Error saving user: ", err);
        return false;
      }
    },

    // Pass data into JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    // Send user info to frontend session
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },

    async redirect() {
      return "/";
    },
  },
});

export { handler as GET, handler as POST };
