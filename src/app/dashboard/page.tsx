import { getServerSession } from "next-auth";
import Link from "next/link";
import { Dashboard } from "~/components/dashboard";
import { db } from "~/server/db";

export default async function DashboardPage() {
  // Fetching session data (if needed)
  const session = await getServerSession();

  // if (!session?.user.id) {
  //   return (
  //     <div>
  //       <h1>Access Denied</h1>
  //       <p>You must be signed in to view this page</p>
  //       <Link href="/api/auth/signin">Sign In</Link>
  //     </div>
  //   );
  // }

  const userData = await db.user.findUnique({
    where: {
      id: "clqsqatf600009qp2xcte9x90",
    },
    include: {
      projects: {
        include: {
          folders: true,
        },
      },
    },
  });

  const createNewFolder = async (name: string) => {
    "use server";
    db.folder.create({
      data: {
        name: "New Folder",
        project: {
          connect: {
            id: userData?.projects[0]?.id,
          },
        },
      },
    });
  };

  // Return the Dashboard component with userData as props
  return <Dashboard createNewFolder={createNewFolder} userData={userData} />;
}
