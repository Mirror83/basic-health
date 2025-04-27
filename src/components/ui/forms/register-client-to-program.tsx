"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { registerClientToProgram } from "@/server/actions/program-client";
import { type Client } from "@/server/zod-schemas";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Plus } from "lucide-react";

const formSchema = z.object({
  clientId: z.coerce.number({ required_error: "Please choose a client" }),
});

export function RegisterClientToProgramForm({
  programId,
  clients,
  className,
}: {
  programId: number;
  clients: Client[];
  className?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const loadingToast = toast.loading("Registering client to program...");
    try {
      toast.dismiss(loadingToast);
      const result = await registerClientToProgram(data.clientId, programId);
      if (result.length === 1) {
        toast.success("Client registered successfully to program");
      } else {
        toast.error("Failed to register client to program");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error registering client to program:", error);
      toast.error("An error occurred");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Client</SelectLabel>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >{`${client.firstName} ${client.lastName}`}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <Plus />
          <span>Add</span>
        </Button>
      </form>
    </Form>
  );
}
