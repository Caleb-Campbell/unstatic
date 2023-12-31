"use client";
import { AvatarImage, AvatarFallback, Avatar } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import FolderList from "./dashboardComponents/FolderList";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Project } from "@prisma/client";
import Modal from "./Modal";

export function Dashboard({
  userData,
  createNewFolder,
}: {
  userData: any;
  createNewFolder: (name: string) => void;
}) {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);

  const newFolderNameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Modal open={showNewFolderModal} setOpen={setShowNewFolderModal}>
        <form
          onSubmit={() => {
            newFolderNameRef.current?.value.length! > 0 &&
              createNewFolder(newFolderNameRef.current?.value!);
          }}
          className="w-[400px] p-5"
        >
          <Label htmlFor="name">Folder Name</Label>
          <Input className="my-1" />
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowNewFolderModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
      <div className="grid gap-4 p-4 lg:grid-cols-[300px_1fr]">
        <div className="flex h-full flex-col overflow-hidden rounded-lg border-r bg-gray-100 dark:bg-gray-800">
          <div className="border-b bg-white dark:bg-gray-900">
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue
                  placeholder={userData.projects[selectedProject || 0].name}
                />
              </SelectTrigger>
              <SelectContent className="w-[300px]">
                {userData.projects.map((project: Project) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={project.id}
                    value={project.name}
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FolderList
            setSelectedFolder={setSelectedFolder}
            folders={userData.projects[selectedProject || 0].folders}
            setShowNewFolderModal={setShowNewFolderModal}
          />
          <div className="border-t bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="z-20 h-12 w-12">
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
          <h1 className="text-2xl font-semibold">
            {
              userData.projects[selectedProject || 0].folders[
                selectedFolder || 0
              ].name
            }
          </h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                className="rounded border-gray-300"
                id="image"
                type="file"
              />
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
    </>
  );
}
