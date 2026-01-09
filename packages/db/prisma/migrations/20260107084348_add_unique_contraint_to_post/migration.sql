/*
  Warnings:

  - A unique constraint covering the columns `[author_id,title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_author_id_title_key" ON "Post"("author_id", "title");
