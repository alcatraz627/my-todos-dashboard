-- CreateTable
CREATE TABLE "Todos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);
