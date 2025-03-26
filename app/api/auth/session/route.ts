import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession()
  console.log("Current session:", session) // Debug log
  return NextResponse.json(session || { user: null })
} 