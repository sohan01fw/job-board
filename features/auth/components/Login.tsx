"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { GoogleButtonIcon, LoadingBtn } from "@/lib/ui";
import { emailschema } from "@/lib/zod/global";
import Link from "next/link";
import { useState } from "react";
import { ZodError } from "zod";
import { SupabaseGoogleLogin, SupabaseMagicLinkLogin } from "../actions";

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isLoadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [msg, setMsg] = useState<
    string | React.ReactElement<HTMLSpanElement>
  >();
  const [EmailError, setEmailError] = useState<string | null>(null);

  const link = { url: process.env.NEXT_PUBLIC_EMAIL_URL as string };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      emailschema.parse(emailValue);
      setLoadingBtn(true);

      const { data, error } = await SupabaseMagicLinkLogin(emailValue);
      if (!data || error) {
        console.log("error on magic email login");
      } else {
        setEmailError("");
        setLoadingBtn(false);
        setMsg(
          <span>
            Please click on the link in your{" "}
            <Link
              href={link.url}
              target="_blank"
              className="text-teal-600 font-semibold underline underline-offset-4"
            >
              email
            </Link>{" "}
            to confirm your login ✉️
          </span>,
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setEmailError(error.errors[0].message);
        setLoadingBtn(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailValue(e.target.value);
  };

  const handleLoginWithGoogle = async () => {
    const { error } = await SupabaseGoogleLogin();
    if (error) {
      toast({
        variant: "default",
        title: "Error while logging in with Google!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Login Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-white">
        {/* 🔔 Notice Bar (outside card, on top of left side only) */}
        <div className="w-full max-w-md bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white text-center py-3 text-sm md:text-base font-medium rounded-t-xl shadow-md mb-6">
          🌟 <span className="font-semibold">Feel Free To Login!</span> You can
          safely log in with your Google account. Manage and delete your data
          anytime from <span className="underline">Settings ⚙️</span>.
        </div>

        {/* Login Card */}
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Login to continue exploring your account
          </p>

          {/* Google Login */}
          <div className="flex justify-center">
            <div
              onClick={handleLoginWithGoogle}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <GoogleButtonIcon />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm mx-2">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Email Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Enter your email"
                onChange={handleChange}
                className="focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
              {EmailError && (
                <p className="text-red-600 text-sm mt-1">{EmailError}</p>
              )}
            </div>

            <div className="w-full flex justify-center">
              {isLoadingBtn ? (
                <LoadingBtn />
              ) : (
                <Button
                  disabled={!!msg}
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </form>

          {/* Message */}
          {msg && (
            <div className="text-center mt-3 text-sm text-gray-700">{msg}</div>
          )}
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-gradient-to-br from-cyan-100 via-emerald-50 to-white">
        <div className="relative flex justify-center items-center w-full max-w-md h-[400px]">
          {/* Overlapping images */}
          <div className="relative w-[300px] h-[300px]">
            <Image
              src="/auth.png"
              alt="Login illustration 1"
              width={300}
              height={300}
              className="rounded-xl shadow-lg transform rotate-[-6deg] translate-x-4 translate-y-2 transition-transform hover:scale-105 absolute z-10 animate-float"
              priority
            />
            <Image
              src="/auth2.png"
              alt="Login illustration 2"
              width={300}
              height={300}
              className="rounded-xl shadow-md transform rotate-[5deg] -translate-x-4 -translate-y-3 opacity-90 transition-transform hover:scale-105 absolute animate-float-slow"
              priority
            />
          </div>
        </div>

        <div className="text-center px-6 mt-8 max-w-md">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Secure & Effortless Login
          </h2>
          <p className="text-gray-600">
            Join our community today. Sign in with Google and manage your data
            securely anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
