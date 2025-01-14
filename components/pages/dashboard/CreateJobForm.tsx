"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { jobCreateSchema } from "@/lib/zod/Form";
import {
  Form, // This should be from your shadcn components
} from "@/components/ui/form";

import {
  InputFormField,
  InputNumberField,
  MultiValueInputField,
  SelectFormInput,
  TextAreaForm,
} from "@/lib/FormsElement";
import {
  genderTypeArr,
  jobCatagoryArr,
  jobLocArr,
  jobTypeArr,
} from "@/lib/data";
import { CreateJobs } from "@/lib/Actions/Jobs";
import useExportHooks from "@/lib/Hooks/useExportHooks";
import { ToastAction } from "@/components/ui/toast";
import { JobApp } from "@/types/Forms";
import { useState } from "react";
import { Loader2 } from "lucide-react";
export function CreateJobForm({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) {
  const { router, toast } = useExportHooks();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof jobCreateSchema>>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      desc: "",
      jobCategory: undefined,
      jobLoc: undefined,
      jobType: undefined,
      joblimit: 0,
      requirements: [],
      salary: 0,
      gender: undefined,
      Links: "",
    },
  });

  async function onSubmit(values: z.infer<typeof jobCreateSchema>) {
    setLoading(true);
    const res = await CreateJobs(values as JobApp, userEmail, userId);
    if (!res?.error) {
      setLoading(false);
      toast({
        title: "Successfully Create a job Application",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputFormField
          form={form}
          label="Job Title"
          name="title"
          placeholder="title"
        />
        <TextAreaForm
          form={form}
          label="Description"
          name="desc"
          placeholder="desc"
        />
        <SelectFormInput
          options={jobCatagoryArr}
          placeholder="Select Jobs"
          form={form}
          label="Job category"
          name="jobCategory"
        />
        <SelectFormInput
          options={jobLocArr}
          placeholder="Job Location"
          form={form}
          label="select a job location"
          name="jobLoc"
        />
        <SelectFormInput
          options={jobTypeArr}
          placeholder="Select a Job type"
          form={form}
          label="Job Type"
          name="jobType"
        />
        <SelectFormInput
          options={genderTypeArr}
          placeholder="Select a Gender"
          form={form}
          label="Select Gender"
          name="gender"
        />
        <InputNumberField
          form={form}
          label="Job application limit"
          name="joblimit"
          placeholder="Enter a jobs no."
        />
        <MultiValueInputField
          form={form}
          label="Job Requirment"
          name="requirements"
          placeholder="select the job requirement"
        />

        <InputNumberField
          form={form}
          label="Job salary"
          name="salary"
          placeholder="Enter a jobs salary"
        />
        <InputFormField
          form={form}
          label="Site Link"
          name="Links"
          placeholder="Add a site link"
        />
        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
