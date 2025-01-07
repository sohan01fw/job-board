"use server";
import { funcResponse } from "@/types/global";
import { supabase } from "../supabase/supabase_client";

// const bucketName = "avatars";
export async function checkBucket(bucketname: string) {
  const bucketData = await supabase.storage.listBuckets();
  const checkBucket = bucketData.data?.some(
    (value) => value.name == bucketname,
  );
  return checkBucket;
}
export async function SetupBucket(bucketname: string) {
  try {
    //check the bucket exist or not
    const checkBuckets = await checkBucket(bucketname);
    if (checkBuckets) {
      return null;
    }
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket(bucketname, {
      public: true,
      allowedMimeTypes: ["image/*", "application/pdf"],
      fileSizeLimit: 5 * 1024 * 1024,
    });
    if (error) {
      console.log(error);
      return {
        error: true,
        message: "Unexpected error while creating bucket",
        data: error,
        status: 500,
      };
    }
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: error,
      message: "Unexpected error while creating bucket",
      status: 500,
      data: error,
    };
  }
}

export async function uploadFile(
  imageFile: File | undefined,
  bname: string,
): Promise<funcResponse> {
  try {
    //check imagefile present or not
    if (imageFile === undefined) {
      return {
        data: false,
        error: true,
        message: "imagefile is undefined",
        status: 400,
      };
    }
    // Create bucket in Supabase file storage
    await SetupBucket(bname);

    // Check if the specific file exists
    const filePath = `public/${imageFile?.name}`;
    const existingFile = await supabase.storage.from(bname).list("public", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    const fileExists = existingFile.data?.some(
      (file) => file.name === imageFile?.name,
    );

    if (!fileExists) {
      // Upload the file if it doesn't exist
      const { error } = await supabase.storage
        .from(bname)
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: true, // Allow replacing existing files (optional)
        });

      if (error) {
        return {
          data: false,
          error: true,
          message: "File failed to upload",
          status: 400,
        };
      }

      return {
        data: true,
        message: "Successfully uploaded file",
        status: 200,
      };
    }
    // Update the file if it already exists
    const { error } = await supabase.storage
      .from(bname)
      .update(filePath, imageFile, {
        cacheControl: "3600",
      });

    if (error) {
      return {
        data: false,
        error: true,
        message: "File update failed",
        status: 400,
      };
    }

    return {
      data: true,
      message: "Successfully updated file",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      data: false,
      message: "Unexpected error occurred while uploading file",
      error: true,
      status: 500,
    };
  }
}

export async function GetAllFile(imageFile: File | undefined, bname: string) {
  try {
    const checkB = await checkBucket(bname);
    if (!checkB) {
      return { message: "bucket not present" };
    }

    const { data } = supabase.storage
      .from(bname)
      .getPublicUrl(`public/${imageFile?.name}`);

    if (!data) {
      return { error: true, message: "file not found", status: 404 };
    }

    return {
      data: data,
      message: "successfully retrive all files",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Unexpected occur while getting all file",
      error: error,
      status: 500,
    };
  }
}
