import { createClient, getClients } from "@/server/actions/clients";
import { createClientSchema } from "@/server/zod-schemas";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const search = searchParams.get("search") ?? "";

    const clients = await getClients({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });

    return Response.json(clients);
  } catch (e) {
    console.error(e);
    return Response.json({ success: "false" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, unknown>;

    const validation = createClientSchema.safeParse(data);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const client = await createClient(validation.data);

    return Response.json(client, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ success: "false" }, { status: 500 });
  }
}
