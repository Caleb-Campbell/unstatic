"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export const createNewFolder = async (name: string, projectId: number) => {
  if (!name) throw new Error("No name provided");
  await db.folder.create({
    data: {
      name,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });
  revalidatePath(`/dashboard`);
};

export const createNewProject = async (name: string, userId: string) => {
  console.log("Creating new project", name);
  await db.project.create({
    data: {
      name,
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
