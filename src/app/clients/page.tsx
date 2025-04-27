import { Button } from "@/components/ui/button";
import { ClientSearch } from "@/components/ui/client-search";
import { ClientsTable } from "@/components/ui/clients-table";
import { getClients } from "@/server/actions/clients";
import type { Client } from "@/server/zod-schemas";
import Link from "next/link";

export default async function ClientsPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="p-4">
      <h1 className="my-4 text-xl">Clients</h1>
      <div className="flex w-full flex-wrap justify-between gap-4">
        <ClientSearch />
        <Button>
          <Link href="/clients/register">Add Client</Link>
        </Button>
      </div>
      <ClientsTableSection
        search={search}
        currentPage={currentPage}
        className="my-8"
      />
    </main>
  );
}

async function ClientsTableSection({
  search,
  currentPage,
  className,
}: {
  search: string;
  currentPage: number;
  className?: string;
}) {
  const clients: Client[] = await getClients({ search, page: currentPage });
  return <ClientsTable clients={clients} className={className} />;
}
