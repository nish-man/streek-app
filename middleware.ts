import { withAuth } from "next-auth/middleware"

// This middleware will run on protected routes
export default withAuth({
  pages: {
    signIn: "/",
  },
})

// Only protect these routes for now
export const config = {
  matcher: [
    "/profile/:path*",
  ],
} 