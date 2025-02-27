"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful signup and redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <Shield className="h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-2xl font-semibold">Join Our Community</h1>
          <p className="text-gray-600 text-center">Sign up to start detecting objects in real-time.</p>
        </div>
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
