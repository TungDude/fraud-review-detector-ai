-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "evaluated_at" TIMESTAMPTZ,
ADD COLUMN     "is_fraud" BOOLEAN NOT NULL DEFAULT false;
