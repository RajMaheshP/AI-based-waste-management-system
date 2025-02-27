'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Waste Classification System</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <svg 
              className="h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Photo Classification</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload a photo to classify waste material
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/photo">
              Start Photo Detection
            </Link>
          </Button>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <svg 
              className="h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Video Classification</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload a video for continuous detection
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/video">
              Start Video Detection
            </Link>
          </Button>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <svg 
              className="h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Live Classification</h2>
          <p className="text-sm text-gray-600 mb-4">
            Real-time detection using your camera
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/live">
              Start Live Detection
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
