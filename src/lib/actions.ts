"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export const createNewFolder = async (
  name: string,
  parentId: number | null,
  projectId: number,
) => {
  // Check if the project exists
  const projectExists = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!projectExists) {
    throw new Error(`Project with ID ${projectId} does not exist.`);
  }

  // Calculate the order for the new folder
  const maxOrder = await db.folder.aggregate({
    _max: {
      order: true,
    },
    where: {
      parentId: parentId,
      projectId: projectId,
    },
  });
  const newOrder = (maxOrder._max.order || 0) + 1;

  // If the parent folder is null, find or create the root folder
  if (parentId === null) {
    const rootFolder = await db.folder.findFirst({
      where: {
        projectId: projectId,
        parentId: null,
      },
    });

    if (!rootFolder) {
      // Create a root folder if it doesn't exist
      const createdRootFolder = await db.folder.create({
        data: {
          name: "Root",
          projectId: projectId,
          parentId: null,
          order: 0,
        },
      });
      parentId = createdRootFolder.id;
    } else {
      parentId = rootFolder.id;
    }
  }

  // Create the new folder
  const newFolder = await db.folder.create({
    data: {
      name: name,
      parentId: parentId,
      projectId: projectId,
      order: newOrder,
    },
  });

  revalidatePath(`/dashboard`);
  return newFolder;
};

export const createNewProject = async (name: string, userId: string) => {
  console.log("Creating new project", name);
  await db.project.create({
    data: {
      name,
      folders: {
        create: {
          name: "Root",
          order: 0,
        },
      },
      users: {
        connect: {
          id: userId,
        },
      },
    },
  });
  revalidatePath(`/dashboard`);
};

export const createNewImage = async ({
  name,
  url,
  image,
  folderId,
}: {
  name: string;
  url: string;
  image: string;
  folderId: number;
}) => {
  await db.image.create({
    data: {
      label: name,
      url,
      src: image,
      folder: {
        connect: {
          id: folderId,
        },
      },
    },
  });
  revalidatePath(`/dashboard`);
};
