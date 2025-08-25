import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/vendors/[id] → Vendor details with products
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vendorId = Number(id);
    if (Number.isNaN(vendorId)) {
      return NextResponse.json({ error: "Invalid vendor id" }, { status: 400 });
    }

    const vendor = await prisma.vendors.findUnique({
      where: { id: vendorId },
      include: {
        Products: true,
      },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    return NextResponse.json({ error: "Failed to fetch vendor" }, { status: 500 });
  }
}


