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

    // Define Folders without projectId
    let folders = [
      { name: "Wedding Views" },
      { name: "Ceremony" },
      // ... rest of the folders
    ];

    // Assign project IDs to folders
    folders = folders.map((folder) => ({
      ...folder,
      projectId: projectIds[0],
    })); // Assuming all folders belong to the first project

    // Create Folders
    // @ts-ignore
    await prisma.folder.createMany({ data: folders });

    // Get Folder IDs for Images
    const createdFolders = await prisma.folder.findMany({
      select: { id: true },
    });
    const folderIds = createdFolders.map((f) => f.id);

    // Define Images
    const images = [
      {
        label: "Image 1",
        url: "https://example.com/image1.jpg",
        folderId: folderIds[0],
      },
      {
        label: "Image 2",
        url: "https://example.com/image2.jpg",
        folderId: folderIds[1],
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
