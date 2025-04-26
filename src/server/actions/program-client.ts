import { and, eq } from "drizzle-orm";
import { db } from "@/server/db/index";
import { client, program, programClient } from "@/server/db/schema";
import { programDbFilter } from "@/server/actions/programs";
import { clientDbFilter } from "@/server/actions/clients";

export async function registerClientToProgram(
  clientId: number,
  programId: number,
) {
  const registration = await db
    .insert(programClient)
    .values({ clientId, programId });

  return registration;
}

export async function deregisterClientFromProgram(
  clientId: number,
  programId: number,
) {
  const deregistration = await db
    .delete(programClient)
    .where(
      and(
        eq(programClient.clientId, clientId),
        eq(programClient.programId, programId),
      ),
    );

  return deregistration;
}

export async function getRegisteredPrograms(clientId: number) {
  const programs = await db
    .select(programDbFilter)
    .from(programClient)
    .leftJoin(program, eq(programClient.clientId, program.id))
    .where(eq(programClient.clientId, clientId));

  return programs;
}

export async function getRegisteredClients(programId: number) {
  const clients = await db
    .select(clientDbFilter)
    .from(programClient)
    .leftJoin(client, eq(programClient.clientId, client.id))
    .where(eq(programClient.programId, programId));

  return clients;
}
