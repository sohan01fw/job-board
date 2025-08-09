"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ZodError } from "zod";
import { UpdateUserProfile } from "@/lib/Actions/Users";
import { GetAllFile, uploadFile } from "@/lib/Actions/FileAction";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageFileSchema } from "@/lib/zod/Form";

const BucketName = "avatars";
export const Imagesync = ({ email, img }: { email: string; img: string }) => {
  const [uploadImageValue, setUploadImageValue] = useState<boolean>(false);
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagefile, setImageFile] = useState<File>();

  useEffect(() => {
    if (img) {
      setImageUrl(img);
    }
  }, [img]);
  //updating user profile pic in database
  async function getfile() {
    const data = await GetAllFile(imagefile, BucketName);
    const imgs = data.data?.publicUrl;
    if (imgs) {
      await UpdateUserProfile(email, { img: imgs });
    }
  }
  useEffect(() => {
    if (uploadImageValue === true) {
      getfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadImageValue]);

  //handling images on change on input field
  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    //check the file type
    try {
      if (file) {
        ImageFileSchema.parse(file);
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          //convet the file into object url
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
          setImageFile(file);
          const imageUploadRes = await uploadFile(file, BucketName);
          if ("error" in imageUploadRes) {
            toast({
              variant: "destructive",
              description: imageUploadRes.message,
            });
          }
          setUploadImageValue(true);
        }
      }
      setFieldErrorMsg("");
    } catch (error) {
      if (error instanceof ZodError) {
        setFieldErrorMsg(error.errors[0].message);
      }
    }
  }
  return (
    <div>
      <Avatar className="relative h-20 w-20">
        <AvatarImage fetchPriority="high" src={`${imageUrl}`} />
        <div className="absolute mt-10 border border-black bottom-0 h-full w-full">
          <Input
            className="mt-5 rounded-full h-full w-full"
            id="picture"
            type="file"
            onChange={handleImage}
          />
        </div>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {fieldErrorMsg && <p className="text-red-500">{fieldErrorMsg}</p>}
    </div>
  );
};
