import { Button } from "@/components/ui/button";
import { ProgramSearch } from "@/components/ui/program-search";
import { ProgramsTable } from "@/components/ui/programs-table";
import { getPrograms } from "@/server/actions/programs";
import type { Program } from "@/server/zod-schemas";
import Link from "next/link";

export default async function ProgramsPage() {
  const programs: Program[] = await getPrograms();
  console.log("programs:", programs);
  return (
    <main className="p-4">
      <h1 className="my-4 text-xl">Programs</h1>
      <div className="flex w-full flex-wrap justify-between gap-4">
        <ProgramSearch />
        <Button>
          <Link href="/programs/create">Create Program</Link>
        </Button>
      </div>
      <ProgramsTable programs={programs} className="my-8" />
    </main>
  );
}
