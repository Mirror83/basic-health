type Params = Promise<{ id: string }>;

import { ClientsTable } from "@/components/ui/clients-table";
import { RegisterClientToProgramForm } from "@/components/ui/forms/register-client-to-program";
import { getClients } from "@/server/actions/clients";
import { getRegisteredClients } from "@/server/actions/program-client";
import { getProgramById } from "@/server/actions/programs"; // Assuming you have a function to fetch the program by ID
import { idSchema, type Client } from "@/server/zod-schemas";
import { notFound } from "next/navigation";

export default async function ProgramPage({ params }: { params: Params }) {
  const { id } = await params;
  const validation = idSchema.safeParse(id);
  if (validation.success === false) {
    return notFound();
  }
  const program = await getProgramById(validation.data);
  if (!program) {
    return notFound();
  }

  const registeredClients: Client[] = await getRegisteredClients(program.id);

  return (
    <main className="p-4">
      <div className="my-4">
        <h1 className="text-3xl font-bold">{program.name}</h1>
        <div className="mt-2">
          <span className="text-sm"> {program.startDate.toDateString()}</span>
          <span className="mx-2">-</span>
          <span className="text-sm">{program.endDate.toDateString()}</span>
        </div>
      </div>

      <p className="text-muted-foreground mt-2">{program.summary}</p>
      <div className="my-4 max-w-prose">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-muted-foreground mt-2">{program.description}</p>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Registered Clients</h2>
      <ClientsTable clients={registeredClients} className="mt-4" />
      <RegisterClientToProgramSection
        programId={validation.data}
        className="mt-4"
      />
    </main>
  );
}

async function RegisterClientToProgramSection({
  programId,
  className,
}: {
  programId: number;
  className?: string;
}) {
  const clients = await getClients();
  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-medium">Register Client</h3>
      <RegisterClientToProgramForm programId={programId} clients={clients} />
    </div>
  );
}
