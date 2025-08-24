// app/api/vendors/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/vendors → List vendors (with market info)
export async function GET() {
  try {
    const vendors = await prisma.vendors.findMany();

    return NextResponse.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 });
  }
}

// POST /api/vendors → Add vendor
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newVendor = await prisma.vendors.create({
      data: {
        user_id: body.userId,
        market_id: body.marketId,
        stall_name: body.stallName,
        type: body.type,
        is_verified: body.isVerified ?? false,
        description: body.description,
        image_url: body.image_url,
      },
    });

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
