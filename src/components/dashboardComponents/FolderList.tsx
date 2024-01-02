"use client";
import React from "react";
import { Folder } from "@prisma/client";
import "react-complex-tree/lib/style-modern.css";
import { Button } from "../ui/button";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";

interface FolderListProps {
  folders: Folder[];
  setSelectedFolder: (id: number) => void;
  setShowNewFolderModal: (show: boolean) => void;
}

type TreeData = {
  [key: string]: TreeItem;
};

interface TreeItem {
  index: string;
  canMove: boolean;
  isFolder: boolean;
  children: string[];
  data: string;
  canRename: boolean;
  order?: number;
}

export default function FolderList({
  folders,
  setSelectedFolder,
  setShowNewFolderModal,
}: FolderListProps) {
  function transformFoldersToTreeData(folders: Folder[]): TreeData {
    const folderMap: { [key: string]: TreeItem } = {};

    folders.forEach((folder) => {
      folderMap[folder.id] = {
        index: folder.id.toString(),
        canMove: true,
        isFolder: true,
        children: [],
        data: folder.name,
        canRename: true,
      };
    });

    folders.forEach((folder) => {
      if (folder.parentId !== null) {
        folderMap[folder.parentId]?.children.push(folder.id.toString());
      }
    });
    Object.values(folderMap).forEach((folder) => {
      folder.children.sort(
        (a, b) => folderMap[a]?.order! - folderMap[b]?.order!,
      );
    });

    const rootFolders = folders.filter((folder) => folder.parentId === null);
    const treeData: TreeData = {
      root: {
        index: "root",
        children: rootFolders.map((folder) => folder.id.toString()),
        data: "Root",
        canMove: true,
        isFolder: true,
        canRename: true,
      },
    };

    return { ...treeData, ...folderMap };
  }

  const data_object = transformFoldersToTreeData(folders);

  return (
    <div className="mt-0">
      {/* {JSON.stringify(folders)} */}
      <UncontrolledTreeEnvironment
        dataProvider={
          new StaticTreeDataProvider(data_object, (item, data) => ({
            ...item,
            data,
          }))
        }
        canDragAndDrop={true}
        canReorderItems={true}
        getItemTitle={(item) => item.data}
        viewState={{}}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}

// NOTE: Docs for react-complex-tree: https://rct.lukasbach.com/docs/getstarted
