import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

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
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <header className="bg-background sticky top-0 flex h-16 items-baseline justify-between gap-4 border-b-2 p-4">
          <Link href="/" className="text-2xl">
            Basic Health
          </Link>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex items-baseline">
                <ol>
                  <Button variant="link" asChild>
                    <Link href="/clients" className="text-sm">
                      Clients
                    </Link>
                  </Button>
                </ol>
                <ol>
                  <Button variant="link" asChild>
                    <Link href="/programs" className="text-sm">
                      Programs
                    </Link>
                  </Button>
                </ol>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
