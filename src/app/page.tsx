import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="my-4 flex gap-4 text-lg">
        <p>Welcome to this basic health program management system.</p>
      </div>
      <div className="my-4 flex gap-4">
        <Button asChild>
          <Link href={"/clients"}>Clients</Link>
        </Button>

        <Button asChild>
          <Link href={"/programs"}>Programs</Link>
        </Button>
      </div>
    </main>
  );
}
