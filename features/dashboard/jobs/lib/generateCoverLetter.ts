// lib/ai/coverLetterGenerator.ts
"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { objectToBullets } from "./objectToBullet";
import { UserData } from "@/types/Forms";
import { JobApplicationData } from "../types";

export async function generateCoverLetter(
  user: UserData,
  job: JobApplicationData,
) {
  const { textStream } = streamText({
    model: google("gemini-2.0-flash"),
    messages: [
      {
        role: "system",
        content: `You are an assistant that writes professional cover letters.
      Do not leave placeholders like [Date], [Platform], [mention project] [Platform -  information not provided].
      Instead, always use the provided user and job information.
      If some detail is missing, rephrase naturally instead of leaving it blank.Don't also mention any links and Date too.And start from Dear directly ok.`,
      },

      {
        role: "user",
        content: `
Generate a tailored cover letter using the details below.
Do not add placeholders. Fill in all information from the Applicant and Job objects.

Applicant:
${objectToBullets(user)}

Job:
${objectToBullets(job)}
        `,
      },
    ],
  });

  return textStream;
}
