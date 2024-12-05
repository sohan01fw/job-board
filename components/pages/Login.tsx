"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SupabaseMagicLinkLogin } from "@/lib/process";
import { LoadingBtn } from "@/lib/ui";
import { emailschema } from "@/lib/zod/global";
import Link from "next/link";
import { useState } from "react";
import { ZodError } from "zod";
export default function Login() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isLoadingBtn, setLoadingBtn] = useState<boolean>();
  const [msg, setMsg] = useState<
    string | React.ReactElement<HTMLSpanElement>
  >();
  const [EmailError, setEmailError] = useState<string | null>(null);

  const link = { url: process.env.NEXT_PUBLIC_EMAIL_URL as string };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //validate email
      emailschema.parse(emailValue);
      //set loading to btn
      setLoadingBtn(true);
      //procced for magic email login.
      const { data, error } = await SupabaseMagicLinkLogin(emailValue);
      if (!data || error) {
        console.log("error on magic email login");
      } else {
        setEmailError("");
        setLoadingBtn(false);
        setMsg(
          <span>
            Please click on link
            <Link
              href={link.url}
              target="_blank"
              className="text-teal-700 pl-2 pr-2 font-bold text-lg"
            >
              email
            </Link>
            to confirm the login
          </span>,
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const inputvalue = e.target.value;
    if (inputvalue) {
      setEmailValue(inputvalue);
    }
  }
  return (
    <div className="login-container flex justify-center">
      <div className="rounded-lg shadow-xl p-2 w-96 mt-16">
        <form onSubmit={handleSubmit}>
          <Input placeholder="write your email" onChange={handleChange} />
          {EmailError && (
            <p className="text-red-700 text-sm p-1">{EmailError}</p>
          )}
          {isLoadingBtn ? (
            <LoadingBtn />
          ) : (
            <Button type="submit" className="m-2">
              submit
            </Button>
          )}
        </form>
        <div className="m-3">{msg && <p>{msg}</p>}</div>
      </div>
    </div>
  );
}
