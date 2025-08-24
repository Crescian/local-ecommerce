import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // MUST be from 'next/headers'
import * as jose from "jose";

export async function GET() {
  try {
    const cookieStore = cookies(); // synchronous in API routes
    const token = (await cookieStore).get("token")?.value; // ✅ get exists

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const payload = await jose.jwtVerify(token, secret);

    return NextResponse.json({ userId: payload.payload.userId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
