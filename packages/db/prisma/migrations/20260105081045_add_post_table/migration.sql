/*
  Warnings:

  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'merchant');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "post_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'customer';

-- CreateTable
CREATE TABLE "Post" (
    "post_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE INDEX "idx_post_owner_id" ON "Post"("owner_id");

-- CreateIndex
CREATE INDEX "idx_comment_post_id" ON "Comment"("post_id");

-- CreateIndex
CREATE INDEX "idx_user_role" ON "User"("role");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
