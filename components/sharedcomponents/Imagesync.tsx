"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { UpdateUserProfile } from "@/lib/Actions/Users";
import { GetAllFile, uploadImageFile } from "@/lib/Actions/FileAction";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const BucketName = "avatars";
export const Imagesync = ({ email, img }: { email: string; img: string }) => {
  const [uploadImageValue, setUploadImageValue] = useState<boolean | undefined>(
    false,
  );
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
      await UpdateUserProfile(email, imgs);
    }
  }
  useEffect(() => {
    if (uploadImageValue === true) {
      getfile();
    }
  }, [uploadImageValue]);

  //handling images on change on input field
  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log(file?.size);
    //check the file type

    try {
      if (file) {
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          //convet the file into object url
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
          setImageFile(file);
          const imageUploadRes = await uploadImageFile(file, BucketName);
          if (imageUploadRes?.error) {
            toast({
              variant: "destructive",
              description: imageUploadRes.message,
            });
          }
          setUploadImageValue(imageUploadRes.updated);
        }
      }
      inputschema.parse(inputValue);

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
        <AvatarImage fetchPriority="high" src={`${imageUrl && imageUrl}`} />
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
