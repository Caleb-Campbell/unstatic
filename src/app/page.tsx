import Link from "next/link";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  const loggedIn = false;

  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex w-full flex-col  items-center justify-center border">
        <h1 className="text-center font-mono text-3xl text-gray-200">
          UnStatic
        </h1>
        <p className="text-center text-gray-200">
          A dynamic solution to rendering images on static sites.
        </p>
      </div>
      <div className="w-full">
        <Button asChild variant={"ghost"} className="mx-auto border-gray-300">
          <Link href="/api/auth/signin">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
