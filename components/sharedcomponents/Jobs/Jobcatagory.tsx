"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

export function Jobcatagory() {
  const { addCatagory, category } = useCatagoryStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof jobCatagoryFormSchema>>({
    resolver: zodResolver(jobCatagoryFormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof jobCatagoryFormSchema>) {
    setLoading(true);
    addCatagory(data.items);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8 flex flex-row gap-3 flex-wrap md:flex-col"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Select filter</FormLabel>
              </div>
              <div className="flex flex-row md:flex-col gap-3">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                field.value?.includes(item.id) ||
                                category.includes(item.id)
                              }
                              onCheckedChange={(checked) => {
                                if (category.length !== 0) {
                                  addCatagory([""]);
                                }
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
