import { Folder } from "@prisma/client";
import Link from "next/link";

export default function FolderList({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex-grow overflow-auto">
      {JSON.stringify(folders)}
      {/* <div className="px-4 pt-4">
        <h3 className="font-semibold">Folder Structure</h3>
      </div>
      <nav className="space-y-1 p-4">
        {folders.map((folder, index) => (
          <Link key={index} className="block" href={folder.link}>
            {folder.name}
          </Link>
        ))}
        <div className="space-y-1 pl-4">
          {subfolders.map((subfolder, index) => (
            <Link key={index} className="block" href={subfolder.link}>
              {subfolder.name}
            </Link>
          ))}
        </div>
      </nav> */}
    </div>
  );
}
