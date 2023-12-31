"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#000000]">
      <div className="flex items-center">
        <FlagIcon className="w-8 h-8 mx-auto text-white" />
        <span className="sr-only">Company Name</span>
      </div>
      <nav className="flex items-center space-x-4">
        <Link className="text-white hover:text-gray-300" href="#">
          Features
        </Link>
        <Link className="text-white hover:text-gray-300" href="#">
          Pricing
        </Link>
        <Link className="text-white hover:text-gray-300" href="#">
          Contact
        </Link>
        <Button asChild variant={"link"} className="mx-auto p-0 font-bold text-white border-gray-300">
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      </nav>
    </div>
  )
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}
