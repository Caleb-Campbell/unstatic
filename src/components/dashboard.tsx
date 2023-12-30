import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import FolderList from "./dashboardComponents/FolderList";
import { db } from "~/server/db";
import { type Folder } from "@prisma/client";

export async function Dashboard() {
  const folders: Folder[] = await db.folder.findMany({
    where: {
      projectId: 1,
    },
  });

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[300px_1fr]">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border-r bg-gray-100 dark:bg-gray-800">
        <div className="border-b bg-white dark:bg-gray-900">
          <h2 className="p-4 text-lg font-semibold">Projects</h2>
          <nav className="p-2">
            <Link
              className="block rounded px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              href="#"
            >
              Project 1
            </Link>
            <Link
              className="block rounded bg-gray-100 px-3 py-1 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800"
              href="/api/auth/signIn"
            >
              Project 2
            </Link>
            <Link
              className="block rounded px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              href="#"
            >
              Project 3
            </Link>
          </nav>
        </div>
        <FolderList folders={folders} />
        <div className="border-t bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold">Username</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Additional Details
              </div>
            </div>
          </div>
          <div className="p-4">
            <Button className="w-full" variant="outline">
              Account Settings
            </Button>
          </div>
        </div>
      </div>
      <main className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">New Image</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Image</Label>
            <Input className="rounded border-gray-300" id="image" type="file" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="label">Label</Label>
            <Input
              className="rounded border-gray-300 "
              id="label"
              type="text"
            />
          </div>
          <Button className="w-32 self-end" variant="outline">
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}