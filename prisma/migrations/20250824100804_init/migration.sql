-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "is_active" BOOLEAN,
ADD COLUMN     "role" VARCHAR(100),
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- CreateTable
CREATE TABLE "public"."Markets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "barangay" VARCHAR(255),
    "city" VARCHAR(255),
    "province" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "Markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vendors" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "market_id" INTEGER,
    "stall_name" VARCHAR(255),
    "type" VARCHAR(255),
    "is_verified" BOOLEAN,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "description" TEXT,
    "image_url" VARCHAR(255),

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);
