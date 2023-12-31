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
      id: "clqt1ijgs0000fp8ncinpnapc",
    },
    include: {
      projects: {
        include: {
          folders: true,
        },
      },
    },
  });

  return <Dashboard userData={userData} />;
}
