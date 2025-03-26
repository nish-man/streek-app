import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

// NextAuth configuration with Google OAuth and Credentials providers
// The secret is used to encrypt cookies and tokens
// Debug mode is enabled in development for better error messages
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug logs to see what's happening
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a mock implementation. Replace with your actual authentication logic
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            image: "https://avatars.githubusercontent.com/u/1234567",
          }
        }
        console.log("Auth failed:", credentials?.email) // Add logging
        return null
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handler as GET, handler as POST } 