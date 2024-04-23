import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../models/userModel";
import connectToMongo from "@/app/lib/mongodb";
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                connectToMongo();
                const user = await User.findOne({ email });
                console.log(user);
                if (!user) {
                    return null
                }
                const matchedpassword = await bcrypt.compare(password, user.password)
                if (!matchedpassword) {
                    return null
                }

                return user

            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user?.id) {
                token.id = user.id
                token.url = user.url
            }

            return token
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.url = token.url;
            return session;
        }
    }


}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }