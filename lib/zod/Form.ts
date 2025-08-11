import { z } from "zod";

//for image file
export const ImageFileSchema = z.custom<File | undefined>(
  (file) =>
    file === undefined ||
    (file instanceof File &&
      file.size <= 5 * 1024 * 1024 &&
      file.type.startsWith("image/")),
  {
    message: "Image must be less than 5MB and of type image.",
  },
);
