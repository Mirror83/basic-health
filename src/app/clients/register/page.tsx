import { RegisterClientForm } from "@/components/ui/forms/register-client";

export default async function RegisterClientPage() {
  return (
    <main className="p-4">
      <h1 className="my-4 text-2xl">Add client</h1>
      <RegisterClientForm className="max-w-[800px]" />
    </main>
  );
}
