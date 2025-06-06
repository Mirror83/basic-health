"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_TIMEOUT_MS = 300;

export function ClientSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, DEBOUNCE_TIMEOUT_MS);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="email"
        placeholder="Type in a name e.g. John Doe"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
