import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UserModel } from '@/lib/models';
import connectDB from '@/lib/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });
        
        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'user',
          });
        }
        return true;
      } catch (error) {
        console.error('Auth signIn error (DB unavailable):', error instanceof Error ? error.message : error);
        return true;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        try {
          await connectDB();
          const dbUser = await UserModel.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.id = dbUser._id.toString();
            session.user.role = dbUser.role;
          }
        } catch (error) {
          console.error('Auth session error (DB unavailable, session limited):', error instanceof Error ? error.message : error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
