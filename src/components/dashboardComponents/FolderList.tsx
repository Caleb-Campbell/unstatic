"use client";
import React from "react";
import { Folder } from "@prisma/client";
import { Button } from "../ui/button";

interface FolderListProps {
  folders: Folder[];
  setSelectedFolder: (id: number) => void;
  setShowNewFolderModal: (show: boolean) => void;
}

export default function FolderList({
  folders,
  setSelectedFolder,
  setShowNewFolderModal,
}: FolderListProps) {
  return (
    <div>
      <Button
        onClick={() => setShowNewFolderModal(true)}
        className="w-full"
        variant="outline"
      >
        New Folder
      </Button>
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="cursor-pointer"
          onClick={() => setSelectedFolder(folder.id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}
