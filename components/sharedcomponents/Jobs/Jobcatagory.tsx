"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { jobCatagoryFormSchema } from "@/lib/zod/Form";
import { useCatagoryStore } from "@/lib/Stores/CatagoryStore";
import { useState } from "react";
import { LoadingBtn } from "@/lib/ui";

const items = [
  {
    id: "FINANCE",
    label: "Finance",
  },
  {
    id: "MARKETING",
    label: "Marketing",
  },
  {
    id: "IT",
    label: "IT",
  },
] as const;

export function JobCategory() {
  const { addCatagory } = useCatagoryStore();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof jobCatagoryFormSchema>>({
    resolver: zodResolver(jobCatagoryFormSchema),
  });

  function onSubmit(data: z.infer<typeof jobCatagoryFormSchema>) {
    setLoading(true);
    addCatagory(data.items);
    setLoading(false);
    console.log(data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-x-6 flex "
      >
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="select a job" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {items.map((item) => {
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
