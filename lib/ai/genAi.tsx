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
    .describe("Name of the hiring company.Take random name ok."),
  location: z
    .string()
    .min(1)
    .describe("Job location (city, state, or remote)."),
  workType: z
    .enum(["remote", "hybrid", "onsite"])
    .describe("Type of working arrangement."),
  jobType: z
    .enum(["full-time", "part-time", "contract", "internship"])
    .describe("Employment type."),
  experience: z
    .enum(["entry", "mid", "senior", "executive"])
    .describe("Experience level required."),
  salary: z.object({
    salaryMin: z.string().min(1).describe("Minimum salary offered."),
    salaryMax: z.string().min(1).describe("Maximum salary offered."),
    currency: z.string().default("USD").describe("Salary currency, e.g., USD."),
  }),
  description: z
    .string()
    .min(50)
    .describe("Detailed job description, minimum 100 characters."),
  applicationDeadline: z
    .string()
    .min(1)
    .describe("Application deadline in YYYY-MM-DD format."),
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
