"use server";

import { program } from "../db/schema";
import { db } from "../db";
import { eq, like, or } from "drizzle-orm";
import type { createProgramSchema, updateProgramSchema } from "../zod-schemas";
import { programDbFilter } from "../db/filters";
import type { z } from "zod";

export async function createProgram(data: z.infer<typeof createProgramSchema>) {
  const newProgram = await db.insert(program).values(data).returning();
  return newProgram;
}

export async function deleteProgram(id: number) {
  const oldProgram = await db
    .delete(program)
    .where(eq(program.id, id))
    .returning();
  return oldProgram;
}

interface GetProgramsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getProgramById(id: number) {
  const matchingProgram = await db
    .select(programDbFilter)
    .from(program)
    .where(eq(program.id, id));

  if (matchingProgram.length === 0) {
    throw new Error(`Could not find program with id: ${id}`);
  }

  return matchingProgram[0];
}

export async function getPrograms({
  page = 1,
  limit = 10,
  search = "",
}: GetProgramsOptions = {}) {
  const offset = (page - 1) * limit;

  const query = db
    .select(programDbFilter)
    .from(program)
    .limit(limit)
    .offset(offset);

  let programs;

  if (search) {
    programs = await query.where(or(like(program.name, `%${search}%`)));
  } else {
    programs = await query;
  }

  return programs;
}

export async function updateProgram(
  id: number,
  data: z.infer<typeof updateProgramSchema>,
) {
  const updatedProgram = await db
    .update(program)
    .set(data)
    .where(eq(program.id, id))
    .returning({
      ...programDbFilter,
      updatedAt: program.updatedAt,
    });
  return updatedProgram;
}
