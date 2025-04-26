import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-2xl font-bold">Basic Health</h1>
      <div className="flex gap-4">
        <Link href={"/clients"}>
          <Button>Clients</Button>
        </Link>
        <Link href={"/programs"}>
          <Button>Programs</Button>
        </Link>
      </div>
    </main>
  );
}
