// import "server-only";

import { z } from "zod";
import { db } from "../db";
import {
  client,
  CLIENT_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  PHONE_NUMBER_LENGTH,
} from "../db/schema";
import { eq, like, or } from "drizzle-orm";

export const createClientSchema = z.object({
  firstName: z.string().min(1).max(CLIENT_NAME_LENGTH),
  lastName: z.string().min(1).max(CLIENT_NAME_LENGTH),
  email: z.string().email().max(MAX_EMAIL_LENGTH),
  phoneNumber: z.string().max(PHONE_NUMBER_LENGTH),
});

const clientDbFilter = {
  id: client.id,
  firstName: client.firstName,
  lastName: client.lastName,
  email: client.email,
  phoneNumber: client.phoneNumber,
};

export async function createClient(data: z.infer<typeof createClientSchema>) {
  const newClient = await db
    .insert(client)
    .values(data)
    .returning(clientDbFilter);

  return newClient[0];
}

interface GetClientsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getClients({
  page = 1,
  limit = 10,
  search = "",
}: GetClientsOptions = {}) {
  const offset = (page - 1) * limit;

  const query = db
    .select(clientDbFilter)
    .from(client)
    .limit(limit)
    .offset(offset);

  let clients;

  if (search) {
    clients = await query.where(
      or(
        like(client.firstName, `%${search}%`),
        like(client.lastName, `%${search}%`),
      ),
    );
  } else {
    clients = await query;
  }

  return clients;
}

/**
 * Searches for clients in the database by their first or last name.
 */
export async function searchForClientsByName(searchTerm: string) {
  const clients = await db
    .select(clientDbFilter)
    .from(client)
    .where(
      or(
        like(client.firstName, `%${searchTerm}%`),
        like(client.lastName, `%${searchTerm}%`),
      ),
    );
  return clients;
}

export async function deleteClient(id: number) {
  const deletedClient = await db
    .delete(client)
    .where(eq(client.id, id))
    .returning(clientDbFilter);

  if (deletedClient.length === 0) {
    throw new Error("Client not found");
  }
  return deletedClient;
}
