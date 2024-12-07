import { z } from "zod";

export const emailschema = z
  .string()
  .min(1, { message: "Email is required!" })
  .email({ message: "Invald email address" });

export const inputschema = z.string().min(1, { message: "field is empty" });
