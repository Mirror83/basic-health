import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Basic Health",
  description: "A simple health management system prototype",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <header className="flex h-16 items-center justify-between gap-4 p-4">
            <div className="flex items-baseline gap-2">
              <Link href="/" className="text-2xl">
                Basic Health
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-baseline">
                <Button variant="link">
                  <Link href="/clients" className="text-sm">
                    Clients
                  </Link>
                </Button>
                <Button variant="link">
                  <Link href="/programs" className="text-sm">
                    Programs
                  </Link>
                </Button>
              </nav>
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
