-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "settingsId" TEXT,
    "shareableLink" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "placeholder" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" TEXT,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "allowMultipleResponses" BOOLEAN NOT NULL DEFAULT false,
    "showProgress" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_settingsId_key" ON "Form"("settingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_shareableLink_key" ON "Form"("shareableLink");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_formId_key" ON "Setting"("formId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Setting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
