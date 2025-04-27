import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { Client } from "@/server/zod-schemas";
import { Button } from "./button";
import Link from "next/link";

export function ClientsTable({
  clients,
  className,
}: {
  clients: Client[];
  className?: string;
}) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>
              {client.firstName} {client.lastName}
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phoneNumber}</TableCell>
            <TableCell>
              <Button variant={"link"}>
                <Link href={"/clients/{id}/profile"}>View Profile</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
