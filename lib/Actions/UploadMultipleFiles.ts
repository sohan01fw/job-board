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

export async function deleteFilesFromBucket({
  bucketName,
  filePaths,
}: {
  bucketName: string;
  filePaths: string[]; // should be the full paths you uploaded (like "public/authorId-timestamp-filename")
}) {
  return withTryCatch(async () => {
    if (!filePaths || filePaths.length === 0)
      throw new Error("No file paths provided");

    const { error } = await supabase.storage.from(bucketName).remove(filePaths);
    if (error) throw error;

    return { success: true };
  }, "Error deleting files from storage");
}

export async function deleteFilesByUrl({
  bucketName,
  urls,
}: {
  bucketName: string;
  urls: string[];
}) {
  return withTryCatch(async () => {
    if (!urls || urls.length === 0) throw new Error("No URLs provided");

    // Extract the path after `/object/public/<bucketName>/`
    const filePaths = urls.map((url) => {
      const match = url.split(`/object/public/${bucketName}/`)[1];
      if (!match)
        throw new Error(`Invalid URL for bucket ${bucketName}: ${url}`);
      return match;
    });

    const { error } = await supabase.storage.from(bucketName).remove(filePaths);
    if (error) throw error;

    return { success: true };
  }, "Error deleting files from storage");
}
