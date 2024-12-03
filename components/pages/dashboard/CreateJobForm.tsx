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
} from "@/lib/Forms";
import {
  genderTypeArr,
  jobCatagoryArr,
  jobLocArr,
  jobTypeArr,
} from "@/lib/data";
export function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof jobCreateSchema>>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      desc: "",
      jobCategory: "IT",
      jobLoc: "REMOTE",
      jobType: "FULLTIME",
      joblimit: 0,
      requirements: [],
      salary: 0,
      gender: "MALE",
      Links: "",
    },
  });
  console.log(form.getValues());

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof jobCreateSchema>) {
    console.log(values);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
