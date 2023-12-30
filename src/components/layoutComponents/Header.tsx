import Image from "next/image";

export default function Header() {
  return (
    <nav className=" p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Image width={100} height={100} src="/favicon.ico" alt="logo" />
        <div className="flex gap-5 text-gray-100">
          <div>Sign in</div>
          <div>Dashboard</div>
        </div>
      </div>
    </nav>
  );
}
