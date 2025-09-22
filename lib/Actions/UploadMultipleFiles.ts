import { supabase } from "../supabase/supabase_client";
import { withTryCatch } from "../tryCatch";
import { SetupBucket } from "./FileUpload"; // reuse your existing SetupBucket

export async function uploadMultipleFiles({
  files,
  bucketName,
  authorId,
}: {
  files: File[];
  bucketName: string;
  authorId: string;
}) {
  return withTryCatch(async () => {
    if (!files || files.length === 0) throw new Error("No files provided");

    await SetupBucket(bucketName);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const timestamp = Date.now();
      const safeFileName = file.name.replace(/\s/g, "_"); // replace spaces
      const filePath = `public/${authorId}-${timestamp}-${safeFileName}`;

      const list = await supabase.storage.from(bucketName).list("public");
      const exists = list.data?.some((f) => f.name === file.name);

      const { error } = exists
        ? await supabase.storage
            .from(bucketName)
            .update(filePath, file, { cacheControl: "3600" })
        : await supabase.storage
            .from(bucketName)
            .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error("Failed to get public URL");

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls; // array of strings
  }, "Error uploading multiple files");
}
