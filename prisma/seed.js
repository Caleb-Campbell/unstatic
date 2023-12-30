import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    await prisma.image.deleteMany();
    await prisma.folder.deleteMany();
    await prisma.project.deleteMany();
    await prisma.client.deleteMany();
    await prisma.developer.deleteMany();
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
}

async function seed() {
  await clearDatabase();
  try {
    const developers = [
      { name: "Developer 1", email: "developer1@example.com" },
      { name: "Developer 2", email: "developer2@example.com" },
    ];
    const clients = [
      { name: "Client 1", email: "client1@example.com" },
      { name: "Client 2", email: "client2@example.com" },
    ];
    const projects = [{ name: "Project 1" }, { name: "Project 2" }];

    // Create Developers and Clients
    await prisma.developer.createMany({ data: developers });
    await prisma.client.createMany({ data: clients });

    // Create Projects and get their IDs
    await prisma.project.createMany({ data: projects });
    const createdProjects = await prisma.project.findMany({
      select: { id: true },
    });
    const projectIds = createdProjects.map((p) => p.id);

    // Adjusted code for folder creation
    const rootFolderCountPerProject = 5; // Assuming we want 5 root folders per project
    const subFolderCountPerRoot = 1; // Each root folder will have 1 subfolder

    for (let projectId of projectIds) {
      for (let i = 0; i < rootFolderCountPerProject; i++) {
        const rootFolderName = `Root Folder ${i + 1}`;
        const rootFolder = await prisma.folder.create({
          data: {
            name: rootFolderName,
            projectId: projectId,
          },
        });

        for (let j = 0; j < subFolderCountPerRoot; j++) {
          const subFolderName = `Subfolder ${i + 1}-${j + 1}`;
          await prisma.folder.create({
            data: {
              name: subFolderName,
              projectId: projectId,
              parentId: rootFolder.id,
            },
          });
        }
      }
    }

    // Define Images
    const images = [
      {
        label: "Image 1",
        url: "https://example.com/image1.jpg",
        folderId: null, // You can associate images with folders as needed
      },
      {
        label: "Image 2",
        url: "https://example.com/image2.jpg",
        folderId: null, // You can associate images with folders as needed
      },
      // ... rest of the images
    ];

    // Create Images
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
