"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Video, Tv, Settings, LogOut, Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Photo Detection", href: "/dashboard/photo", icon: Camera },
    { name: "Video Detection", href: "/dashboard/video", icon: Video },
    { name: "Live Demo", href: "/dashboard/live", icon: Tv },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 border-r bg-gray-100 dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-semibold">ADS</span>
            <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
              Close
            </Button>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </div>
          <Button variant="ghost" onClick={() => window.location.href = '/login'}>
            <LogOut className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
