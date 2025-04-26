type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  return Response.json({ id }, { status: 200 });
}
