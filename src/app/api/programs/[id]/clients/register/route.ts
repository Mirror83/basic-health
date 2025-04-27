import { registerClientToProgram } from "@/server/actions/program-client";
import { idSchema } from "@/server/zod-schemas";
import { z } from "zod";

type params = Promise<{ id: string; clientId: string }>;

const bodySchema = z.object({
  clientId: idSchema,
});

export async function POST(request: Request, { params }: { params: params }) {
  try {
    const { id } = await params;
    const paramValidation = idSchema.safeParse(id);
    if (paramValidation.success === false) {
      return Response.json({ error: paramValidation.error }, { status: 400 });
    }

    const data = (await request.json()) as Record<string, unknown>;
    const bodyValidation = bodySchema.safeParse(data);
    if (bodyValidation.success === false) {
      return Response.json({ error: bodyValidation.error }, { status: 400 });
    }

    const registration = await registerClientToProgram(
      bodyValidation.data.clientId,
      paramValidation.data,
    );
    return Response.json(registration);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
