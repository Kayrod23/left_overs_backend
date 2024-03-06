-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "picture" TEXT;

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeSteps" TEXT NOT NULL,
    "image" TEXT,
    "comment" TEXT,
    "rating" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
