import { CreateProgramForm } from "@/components/ui/forms/create-program";

export default async function RegisterClientPage() {
  return (
    <main className="p-4">
      <h1 className="my-4 text-2xl">Create Program</h1>
      <CreateProgramForm className="max-w-[800px]" />
    </main>
  );
}
