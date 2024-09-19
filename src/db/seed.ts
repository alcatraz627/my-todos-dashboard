import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  if ((await prisma.todo.count()) > 0) {
    console.log("Tasks already exist");

    return;
  }

  const tasks = await prisma.todo.createMany({
    data: [
      {
        title: "Create Books",
        completed: false,
      },
      {
        title: "Write Color",
        completed: false,
      },
      {
        title: "Paint Words",
        completed: true,
      },
    ],
  });

  console.log("Created Tasks: ", tasks);

  return;
}

main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
