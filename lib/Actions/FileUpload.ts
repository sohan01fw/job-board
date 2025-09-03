import { supabase } from "../supabase/supabase_client";
import { withTryCatch } from "../tryCatch";

// Check if bucket exists
export async function checkBucket(bucketname: string) {
  return withTryCatch(async () => {
    const bucketData = await supabase.storage.listBuckets();
    return bucketData.data?.some((b) => b.name === bucketname) ?? false;
  }, "Error checking bucket");
}

// Create bucket if not exist
export async function SetupBucket(bucketname: string) {
  return withTryCatch(async () => {
    const exists = await checkBucket(bucketname);
    if (exists) return null;

    const { data, error } = await supabase.storage.createBucket(bucketname, {
      public: true,
      allowedMimeTypes: ["image/*", "application/pdf"],
      fileSizeLimit: 5 * 1024 * 1024,
    });

    if (error) throw error;
    return data;
  }, "Error creating bucket");
}

// Upload or update file

export async function uploadFile({
  imageFile,
  imageUrl,
  bucketName,
  fileName,
}: {
  imageFile?: File;
  imageUrl?: string;
  bucketName: string;
  fileName?: string; // fallback if URL → we can use `${Date.now()}.png`
}) {
  return withTryCatch(async () => {
    let fileToUpload: File | undefined;

    if (imageFile) {
      fileToUpload = imageFile;
    } else if (imageUrl) {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image from URL");

      const blob = await response.blob();
      const ext = blob.type.split("/")[1] || "png";
      fileToUpload = new File([blob], fileName ?? `${Date.now()}.${ext}`, {
        type: blob.type,
      });
    }

    if (!fileToUpload) throw new Error("No file or URL provided");

    await SetupBucket(bucketName);

    const filePath = `public/${fileToUpload.name}`;
    const list = await supabase.storage.from(bucketName).list("public");
    const exists = list.data?.some((f) => f.name === fileToUpload.name);

    const { error } = exists
      ? await supabase.storage
          .from(bucketName)
          .update(filePath, fileToUpload, { cacheControl: "3600" })
      : await supabase.storage.from(bucketName).upload(filePath, fileToUpload, {
          cacheControl: "3600",
          upsert: true,
        });

    if (error) throw error;

    // return public URL immediately
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return { uploaded: true, publicUrl: data.publicUrl };
  }, "Error uploading file");
}

// Get public URL of file
export async function getFileUrl({
  imageFile,
  fileName,
  bucketName,
}: {
  imageFile?: File;
  fileName?: string;
  bucketName: string;
}) {
  return withTryCatch(async () => {
    if (!imageFile && !fileName) throw new Error("No file or name provided");

    const exists = await checkBucket(bucketName);
    if (!exists) throw new Error("Bucket not present");

    const targetName = imageFile?.name ?? fileName!;
    const filePath = `public/${targetName}`;

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    if (!data?.publicUrl) throw new Error("File not found");

    return data;
  }, "Error getting file URL");
}
