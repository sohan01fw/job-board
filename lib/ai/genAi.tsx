"use server";

import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { createStreamableValue } from "@ai-sdk/rsc";
import { z } from "zod";

const jobPostSchema = z.object({
  title: z.string().min(1).describe("Job title of the position."),
  company: z
    .string()
    .min(1)
    .describe(
      "Name of the hiring company.Take random name and unique everytime.",
    ),
  location: z
    .string()
    .min(1)
    .describe(
      "Job location (city, state, country)only.Don't include these (remote, hybrid, onsite )",
    ),
  workType: z
    .enum(["remote", "hybrid", "onsite"])
    .describe("Type of working arrangement."),
  jobType: z
    .enum(["fulltime", "parttime", "contract", "internship"])
    .describe("Employment type."),
  experience: z
    .enum(["entry", "mid", "senior", "executive"])
    .describe("Experience level required."),
  minSalary: z
    .number()
    .min(20000, "Minimum salary must be at least 20000")
    .describe(
      "Minimum salary offered.just create number not any symbol.just create number don't separate it with comma.",
    ),
  maxSalary: z
    .number()
    .min(30000, "Maximum salary must be at least 30000")
    .describe(
      "Maximum salary offered.just create number not any symbol.just create number don't separate it with comma.",
    ),
  currency: z.string().default("USD").describe("Salary currency, e.g., USD."),
  description: z
    .string()
    .min(50)
    .describe("Detailed job description, minimum 100 characters."),

  applicationDeadline: z
    .string()
    .describe(
      "Application deadline as a date string in YYYY-MM-DD format,just search on internet to find the current yr and set the deadline to future date ok",
    ),
  contactEmail: z
    .string()
    .email()
    .describe("Valid contact email for applications."),

  requirements: z.array(z.string()).describe("List of job requirements"),
  benefits: z.array(z.string()).describe("List of job benefits"),
  skills: z.array(z.string()).describe("List of required skills"),
});

export async function genAi(prompt: string) {
  if (!/job|hiring|vacancy|position|role|dev/i.test(prompt)) {
    return { error: "I can't help with that." };
  }

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = streamObject({
      model: google("models/gemini-1.5-flash"),
      system: "Only generate valid job post data strictly matching the schema.",
      prompt,
      schema: jobPostSchema,
    });

    for await (const partial of partialObjectStream) {
      stream.update(partial); // merge partial updates
    }

    stream.done();
  })();

  return { object: stream.value };
}
