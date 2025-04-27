import { Button } from "@/components/ui/button";
import { ClientSearch } from "@/components/ui/client-search";
import { ClientsTable } from "@/components/ui/clients-table";
import { getClients } from "@/server/actions/clients";
import type { Client } from "@/server/zod-schemas";
import Link from "next/link";

export default async function ClientsPage() {
  const clients: Client[] = await getClients();
  console.log("clients:", clients);
  return (
    <main className="p-4">
      <h1 className="my-4 text-xl">Clients</h1>
      <div className="flex w-full flex-wrap justify-between gap-4">
        <ClientSearch />
        <Button>
          <Link href="/clients/register">Add Client</Link>
        </Button>
      </div>
      <ClientsTable clients={clients} className="my-8" />
    </main>
  );
}
