import { z } from "zod";
import { program } from "../db/schema";
import { db } from "../db";
import { eq, like, or } from "drizzle-orm";

export const createProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  summary: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const programDbFilter = {
  name: program.name,
  summary: program.summary,
  description: program.description,
  startDate: program.startDate,
  endDate: program.endDate,
};

export function createProgram(data: z.infer<typeof createProgramSchema>) {
  const newProgram = db.insert(program).values(data).returning();
  return newProgram;
}

export function deleteProgram(id: number) {
  const oldProgram = db.delete(program).where(eq(program.id, id)).returning();
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

export const updateProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export function updateProgram(
  id: number,
  data: z.infer<typeof updateProgramSchema>,
) {
  const updatedProgram = db
    .update(program)
    .set(data)
    .where(eq(program.id, id))
    .returning({
      ...programDbFilter,
      updatedAt: program.updatedAt,
    });
  return updatedProgram;
}
