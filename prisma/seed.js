import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    await prisma.image.deleteMany();
    await prisma.folder.deleteMany();
    await prisma.project.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.verificationToken.deleteMany();
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
}

async function seed() {
  await clearDatabase();
  try {
    // Seed Users
    const users = [
      { name: "User 1", email: "user1@example.com", isDeveloper: true },
      { name: "User 2", email: "user2@example.com", isDeveloper: false },
    ];
    await prisma.user.createMany({ data: users });
    const createdUsers = await prisma.user.findMany({ select: { id: true } });
    const userIds = createdUsers.map((u) => u.id);

    // Define how many projects you want per user
    const projectsPerUser = 2; // Adjust as needed

    // Seed Projects with User Relation
    for (const userId of userIds) {
      for (let i = 0; i < projectsPerUser; i++) {
        await prisma.project.create({
          data: {
            name: `Project ${i + 1} of User ${userId}`,
            users: {
              connect: { id: userId },
            },
          },
        });
      }
    }

    // Continue with Folder and Image Seeding
    const rootFolderCountPerProject = 5;
    const subFolderCountPerRoot = 1;
    const createdProjects = await prisma.project.findMany({
      select: { id: true },
    });
    const projectIds = createdProjects.map((p) => p.id);

    for (let projectId of projectIds) {
      let rootFolderOrder = 1;
      for (let i = 0; i < rootFolderCountPerProject; i++) {
        const rootFolderName = `Root Folder ${i + 1}`;
        const rootFolder = await prisma.folder.create({
          data: {
            name: rootFolderName,
            projectId: projectId,
            order: rootFolderOrder++,
          },
        });

        let subFolderOrder = 1;
        for (let j = 0; j < subFolderCountPerRoot; j++) {
          const subFolderName = `Subfolder ${i + 1}-${j + 1}`;
          await prisma.folder.create({
            data: {
              name: subFolderName,
              projectId: projectId,
              parentId: rootFolder.id,
              order: subFolderOrder++,
            },
          });
        }
      }
    }

    // Seed Images (assuming a generic approach)
    // @ts-ignore
    const images = [
      "https://imgix.ranker.com/user_node_img/50069/1001364282/original/baby-capybaras-can_t-swim-photo-u1?fit=crop&fm=pjpg&q=60&w=650&dpr=2",
    ];
    // @ts-ignore
    await prisma.image.createMany({ data: images });

    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
