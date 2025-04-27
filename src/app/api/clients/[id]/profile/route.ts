import { getClientProfile } from "@/server/actions/clients";
import { idSchema } from "@/server/zod-schemas";

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;

    const validation = idSchema.safeParse(id);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    try {
      const profile = await getClientProfile(validation.data);
      return Response.json(profile);
    } catch (e) {
      console.error(e);
      if (e instanceof Error && e.message === "Client not found") {
        return Response.json({ error: e.message }, { status: 404 });
      }
      return Response.json({ error: "Client not found" }, { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return Response.json({ success: "false" }, { status: 500 });
  }
}
