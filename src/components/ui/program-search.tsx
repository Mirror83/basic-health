import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProgramSearch() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Type in a name e.g. Malaria Aid" />
      <Button type="submit" variant={"outline"}>
        Search
      </Button>
    </div>
  );
}
