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
import { Image, Project } from "@prisma/client";
import Modal from "./Modal";
import CreateANewProject from "~/views/CreateAProject";
import { ArrowLeft, PlusIcon, XIcon } from "lucide-react";
import { ImageList } from "./component/ImageList";
import {
  createNewFolder,
  createNewImage,
  createNewProject,
} from "~/lib/actions";
import { UploadButton } from "./uploadthing/uploadthing";

type NewImageData = {
  url: string;
  label: string;
  image: string;
};

export function Dashboard({ userData }: { userData: any }) {
  const [selectedFolder, setSelectedFolder] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(
    userData.projects[0]?.id || null,
  );
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [showNewImageModal, setShowNewImageModal] = useState<boolean>(false);
  const [newImageData, setNewImageData] = useState<NewImageData>({
    url: "",
    label: "",
    image: "",
  });

  const newFolderNameRef = useRef<HTMLInputElement>(null);

  if (!userData.projects[0]) {
    return (
      <CreateANewProject
        finishView={() =>
          createNewProject(newFolderNameRef.current?.value!, userData.id)
        }
        projectTitleRef={newFolderNameRef}
      />
    );
  }

  const urlBuilder = (image: Image) => {
    return `https://unstatic.com/${
      userData.projects[selectedProject || 0].id
    }/${userData.projects[selectedProject || 0].folders[selectedFolder].id}/${
      image.url
    }`;
  };

  return (
    <>
      <Modal open={showNewFolderModal} setOpen={setShowNewFolderModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              newFolderNameRef.current?.value &&
              newFolderNameRef.current?.value.length > 0 &&
              selectedProject != null
            ) {
              createNewFolder(
                newFolderNameRef.current?.value!,
                userData.projects.find(
                  (project: Project) => project.id === selectedProject,
                )?.id, // Use the selectedProject's ID
                selectedFolder,
              );
              setShowNewFolderModal(false);
            } else {
              // Handle the case where selectedProject is null
              alert("Please select a project first.");
            }
          }}
          className="w-[400px] p-5"
        >
          <Label htmlFor="name">Folder Name</Label>
          <Input className="my-1" ref={newFolderNameRef} />
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
      <Modal open={showNewImageModal} setOpen={setShowNewImageModal}>
        <div className="w-[700px] p-5">
          <Label htmlFor="name" className="text-2xl">
            Image Label
          </Label>
          <Input
            className="my-1"
            onChange={(e) =>
              setNewImageData({ ...newImageData, label: e.target.value })
            }
          />
          <p className="text-sm italic">
            * This label is for your identification and does not affect any part
            of your image.
          </p>
          {!newImageData.image && (
            <>
              <p className="my-5 text-center text-sm">
                You don't need to upload an image. That can be done later by you
                or your client.
              </p>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  console.log(res[0].url);
                  setNewImageData({ ...newImageData, image: res[0].url });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </>
          )}
          {newImageData.image && (
            <div className="relative">
              <Button
                className="absolute right-1 top-1"
                variant="destructive"
                onClick={() => setNewImageData({ ...newImageData, image: "" })}
              >
                <XIcon className="h-4 w-4" />
              </Button>
              <img src={newImageData.image} />
            </div>
          )}
          <Label htmlFor="url" className="text-2xl">
            Image URL
          </Label>
          <p className="mb-4 text-sm">
            This is the URL that will be used to display your image.
          </p>
          {/* TODO: We will need to add the real URL */}
          <div>
            {!!userData.projects[0].folders[0] && (
              <span>
                {"https://unstatic.com/"}
                {selectedProject || userData.projects[0].id}
                {"/"}
                {selectedFolder || userData.projects[0].folders[0].name}
                {"/"}
              </span>
            )}
            <input
              className="inline h-5 w-fit max-w-[50%] border-b border-slate-700 py-0 focus:outline-none focus:ring-0"
              onChange={(e) =>
                setNewImageData({ ...newImageData, url: e.target.value })
              }
            />
          </div>
          <div className="mx-auto mt-10 flex w-1/2 items-center justify-between">
            <Button
              className="mx-2 w-full"
              variant="outline"
              onClick={() => setShowNewImageModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="mx-2 w-full"
              onClick={() => {
                setShowNewImageModal(false);
                newImageData.label && newImageData.url;
                createNewImage({
                  name: newImageData.label,
                  url: newImageData.url,
                  image: newImageData.image,
                  folderId:
                    userData.projects[selectedProject || 0].folders[
                      selectedFolder
                    ].id,
                });
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
      <div className="grid gap-4 p-4 lg:grid-cols-[300px_1fr]">
        <div className="flex h-[90vh] flex-col justify-between overflow-hidden rounded-lg border-r bg-gray-100 dark:bg-gray-800">
          <div>
            <div className="border-b bg-white dark:bg-gray-900">
              <Select>
                <SelectTrigger className="w-[300px]">
                  {selectedProject != null && (
                    <SelectValue
                      placeholder={
                        userData.projects.find(
                          (project: Project) => project.id === selectedProject,
                        )?.name
                      }
                    />
                  )}
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
                  <SelectItem
                    className="flex cursor-pointer"
                    value={"Create a new project"}
                  >
                    <PlusIcon className="ml-2 h-4 w-4" />
                    <span>Create New Project</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => setShowNewFolderModal(true)}
              className={`w-full ${
                userData.projects.find(
                  (project: Project) => project.id === selectedProject,
                )?.folders.length <= 0 && "animate-pulse bg-yellow-200"
              }`}
              variant="outline"
            >
              New Folder
            </Button>
            <FolderList
              setSelectedFolder={setSelectedFolder}
              folders={
                userData.projects.find(
                  (project: Project) => project.id === selectedProject,
                )?.folders
              }
              setShowNewFolderModal={setShowNewFolderModal}
            />
          </div>

          <div className="border-t bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="z-20 h-12 w-12">
                <AvatarImage alt="User Avatar" src={userData.image} />
                <AvatarFallback>{userData.name}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold">{userData.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.email}
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button className="w-full" variant="link">
                Account Settings
              </Button>
            </div>
          </div>
        </div>
        {userData.projects.find(
          (project: Project) => project.id === selectedProject,
        )?.folders.length > 0 ? (
          <main className="flex flex-col gap-4">
            <ImageList
              urlBuilder={urlBuilder}
              openNewImageModal={() => setShowNewImageModal(true)}
              images={
                userData.projects.find(
                  (project: Project) => project.id === selectedProject,
                )?.folders[selectedFolder].images as Image[]
              }
            />
          </main>
        ) : (
          <main className="flex flex-col gap-4 p-4">
            <p className="text-center text-3xl font-bold">
              Let's make a folder
            </p>
            <p className="text-center text-gray-500">
              Folders are how you'll organize your images, so you or your client
              can easily find and change them.
            </p>
            <p className="text-center text-gray-500">
              You can create a folder in the sidebar on the left.
              <ArrowLeft className="mx-auto h-12 w-12 text-gray-500" />
            </p>
          </main>
        )}
      </div>
    </>
  );
}
