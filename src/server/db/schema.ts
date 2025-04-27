// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";
import {
  CLIENT_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_VARCHAR_LENGTH,
  PHONE_NUMBER_LENGTH,
} from "@/server/db/constants";

export const program = pgTable(
  "program",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
    summary: d.varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
    description: d.text().notNull(),
    startDate: d.timestamp({ withTimezone: true }).notNull(),
    endDate: d.timestamp({ withTimezone: true }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("program_name_idx").on(t.name)],
);

export const client = pgTable(
  "client",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    firstName: d.varchar({ length: CLIENT_NAME_LENGTH }).notNull(),
    lastName: d.varchar({ length: CLIENT_NAME_LENGTH }).notNull(),
    email: d.varchar({ length: MAX_EMAIL_LENGTH }).notNull(),
    phoneNumber: d.varchar({ length: PHONE_NUMBER_LENGTH }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("client_email_idx").on(t.email),
    index("client_name_idx").on(t.firstName, t.lastName),
  ],
);

export const programClient = pgTable(
  "program_client",
  (d) => ({
    programId: d
      .integer()
      .notNull()
      .references(() => program.id),
    clientId: d
      .integer()
      .notNull()
      .references(() => client.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("program_client_program_idx").on(t.programId),
    index("program_client_client_idx").on(t.clientId),
  ],
);
