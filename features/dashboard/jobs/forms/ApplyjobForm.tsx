"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import JobDetailsPage from "../components/JobDetails";
import { applyJobSchema } from "../lib/zod/schema";
import { useJobStore } from "../stores/JobStore";
import { useState } from "react";
import { PostJobsForm } from "../actions"; // adjust path if needed

export function ApplyJobForm({ jobAppId }: { jobAppId: string }) {
  const { router, toast } = useExportHooks();
  const { job } = useJobStore();
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
    try {
      const res = await PostJobsForm(values as any, jobAppId);
      if (!res?.error) {
        toast({ title: "Successfully applied for a job Application" });
        router.back();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            res.message ||
            "There was a problem with your request. Please refresh.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Unexpected error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!job) return null;
  return (
    <div className="flex flex-row gap-5 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  w-96"
        >
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
          <button type="submit" disabled={loading}>
            {loading ? "Applying..." : "Apply"}
          </button>
        </form>
      </Form>
      <JobDetailsPage data={job} showbtn={false} delcard={false} />
    </div>
  );
}
