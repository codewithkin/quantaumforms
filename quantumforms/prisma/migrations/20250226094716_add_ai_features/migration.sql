-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "deviceType" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "style" JSONB,
ADD COLUMN     "submitMessage" TEXT DEFAULT 'Submit',
ADD COLUMN     "theme" TEXT DEFAULT 'light';
