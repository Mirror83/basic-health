type Params = Promise<{ id: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
  const { id } = await params;
  return <main className="p-4">Profile: {id}</main>;
}
