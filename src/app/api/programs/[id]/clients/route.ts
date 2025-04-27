import { getRegisteredClients } from "@/server/actions/program-client";
import { idSchema } from "@/server/zod-schemas";

type params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: params }) {
  try {
    const { id } = await params;

    const validation = idSchema.safeParse(id);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const programs = await getRegisteredClients(validation.data);
    return Response.json(programs);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
