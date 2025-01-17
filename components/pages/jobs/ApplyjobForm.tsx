"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { applyJobSchema } from "@/lib/zod/Form";
import {
  Form, // This should be from your shadcn components
} from "@/components/ui/form";

import {
  ImageInputForm,
  InputFormField,
  InputNumberField,
  SelectFormInput,
  TextAreaForm,
} from "@/lib/FormsElement";
import { genderTypeArr } from "@/lib/data";
import useExportHooks from "@/lib/Hooks/useExportHooks";
import { ToastAction } from "@/components/ui/toast";
import { PostJobsForm } from "@/lib/Actions/JobForm";
import { ApplyJobSchemaType } from "@/types/Forms";
import { useState } from "react";
import { LoadingBtn } from "@/lib/ui";
export function ApplyJobForm({ jobAppId }: { jobAppId: string }) {
  const { router, toast } = useExportHooks();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof applyJobSchema>>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      fname: "",
      lname: "",
      about: "",
      age: 0,
      gender: undefined,
      sociallinks: [],
      resume: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof applyJobSchema>) {
    setLoading(true);
    const postformres = await PostJobsForm(
      values as ApplyJobSchemaType,
      jobAppId as string,
    );
    if (!postformres?.error) {
      setLoading(false);
      toast({
        title: "Successfully applied for a job Application",
      });
      router.back();
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request.Please Refresh the page",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-96">
        <InputFormField
          form={form}
          label="fname"
          name="fname"
          placeholder="write your fname..."
        />
        <InputFormField
          form={form}
          label="lname"
          name="lname"
          placeholder="write your lname..."
        />
        <TextAreaForm
          form={form}
          label="About"
          name="about"
          placeholder="write about you..."
        />
        <ImageInputForm form={form} label="Upload Resume" name="resume" />
        <SelectFormInput
          options={genderTypeArr}
          placeholder="Select your gender"
          form={form}
          label="gender"
          name="gender"
        />

        <InputNumberField
          form={form}
          label="Age"
          name="age"
          placeholder="Enter your age"
        />
        {loading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
