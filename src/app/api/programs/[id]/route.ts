import {
  getProgramById,
  updateProgramSchema,
  updateProgram,
  deleteProgram,
} from "@/server/actions/programs";
import { z } from "zod";

type Params = Promise<{ id: string }>;

const idSchema = z.coerce.number().int().positive();

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const validation = idSchema.safeParse(id);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const program = await getProgramById(validation.data);

    return Response.json(program);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const paramValidation = idSchema.safeParse(id);
    if (paramValidation.success === false) {
      return Response.json({ error: paramValidation.error }, { status: 400 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const bodyValidation = updateProgramSchema.safeParse(body);
    if (bodyValidation.success === false) {
      return Response.json({ error: bodyValidation.error }, { status: 400 });
    }

    const program = await updateProgram(
      paramValidation.data,
      bodyValidation.data,
    );

    return Response.json(program);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const validation = idSchema.safeParse(id);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const program = await deleteProgram(validation.data);

    return Response.json(program);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
