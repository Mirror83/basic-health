import {
  createProgram,
  createProgramSchema,
  getPrograms,
} from "@/server/actions/programs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const search = searchParams.get("search") ?? "";

    const clients = await getPrograms({
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

    const validation = createProgramSchema.safeParse(data);
    if (validation.success === false) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    try {
      const client = await createProgram(validation.data);
      return Response.json(client, { status: 201 });
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("Could not find")) {
        return Response.json(
          { success: false, error: error.message },
          { status: 404 },
        );
      } else {
        return Response.json({ success: false }, { status: 500 });
      }
    }
  } catch (e) {
    console.error(e);
    return Response.json({ success: "false" }, { status: 500 });
  }
}
