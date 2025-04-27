import { z } from "zod";
import {
  CLIENT_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  PHONE_NUMBER_LENGTH,
} from "./db/constants";

export type Client = z.infer<typeof createClientSchema> & { id: number };

export const createClientSchema = z.object({
  firstName: z.string().min(1).max(CLIENT_NAME_LENGTH),
  lastName: z.string().min(1).max(CLIENT_NAME_LENGTH),
  email: z.string().email().max(MAX_EMAIL_LENGTH),
  phoneNumber: z.string().max(PHONE_NUMBER_LENGTH),
});

export const createProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  summary: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const updateProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type Program = z.infer<typeof createProgramSchema> & { id: number };
