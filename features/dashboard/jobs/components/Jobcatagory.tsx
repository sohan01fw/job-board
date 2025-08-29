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
import { jobCatagoryFormSchema } from "../lib/zod/schema";
import { items } from "../lib/constant";
import { useCatagoryStore } from "../stores/CatagoryStore";

export function JobCategory() {
  const { addCatagory } = useCatagoryStore();

  const form = useForm<z.infer<typeof jobCatagoryFormSchema>>({
    resolver: zodResolver(jobCatagoryFormSchema),
  });

  function onSubmit(data: z.infer<typeof jobCatagoryFormSchema>) {
    addCatagory(data.items);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
