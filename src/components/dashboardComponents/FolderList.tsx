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
    <div className="mt-0">
      <Button
        onClick={() => setShowNewFolderModal(true)}
        className={`w-full ${
          folders.length <= 0 && "animate-pulse bg-yellow-200"
        }`}
        variant="outline"
      >
        New Folder
      </Button>
      {folders.map((folder, index) => (
        <div
          key={folder.id}
          className="cursor-pointer"
          onClick={() => setSelectedFolder(index)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}
