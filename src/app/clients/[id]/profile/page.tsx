import { ProgramsTable } from "@/components/ui/programs-table";
import { getClientById } from "@/server/actions/clients";
import { getRegisteredPrograms } from "@/server/actions/program-client";
import { idSchema } from "@/server/zod-schemas";
import { UserCircle } from "lucide-react";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
  const { id } = await params;
  const validation = idSchema.safeParse(id);
  if (validation.success === false) {
    return notFound();
  }

  const client = await getClientById(validation.data);
  if (!client) {
    return notFound();
  }

  return (
    <main className="p-4">
      <h1 className="my-4 text-2xl font-bold">Profile</h1>
      <div className="flex items-center gap-4">
        <UserCircle size={48} />
        <div>
          <p className="font-bold">{`${client.firstName} ${client.lastName}`}</p>
          <p className="text-sm">{client.phoneNumber}</p>
          <p className="text-sm">{client.email}</p>
        </div>
      </div>
      <RegisteredProgramsSection clientId={validation.data} className="my-4" />
    </main>
  );
}

async function RegisteredProgramsSection({
  clientId,
  className,
}: {
  clientId: number;
  className?: string;
}) {
  const programs = await getRegisteredPrograms(clientId);
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold">Registered Programs</h2>
      <ProgramsTable programs={programs} />
    </div>
  );
}
