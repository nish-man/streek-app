import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/",
  },
})

export const config = {
  matcher: [
    "/challenges/:path*",
    "/analytics/:path*",
    "/rewards/:path*",
    "/community/:path*",
    "/profile/:path*",
  ],
} 