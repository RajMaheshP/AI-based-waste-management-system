'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">
          RecycleX
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
