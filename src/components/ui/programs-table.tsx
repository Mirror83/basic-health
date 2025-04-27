import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Program } from "@/server/zod-schemas";
import { Button } from "./button";
import Link from "next/link";

export function ProgramsTable({
  programs,
  className,
}: {
  programs: Program[];
  className?: string;
}) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs.map((program) => (
          <TableRow key={program.id}>
            <TableCell>{program.name}</TableCell>
            <TableCell>{program.summary}</TableCell>
            <TableCell>{program.startDate.toDateString()}</TableCell>
            <TableCell>{program.endDate.toDateString()}</TableCell>
            <TableCell>
              <Button variant={"link"}>
                <Link href={`/programs/${program.id}`}>View Program</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
