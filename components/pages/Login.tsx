"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/supabase_client";
import { useState } from "react";

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>();
  const [msg, setMsg] = useState<string>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailValue || "",
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });
    if (!data || error) {
      console.log("error on magic email login");
    } else {
      setMsg("Link sent to your email. Please confirm it!");
    }
  };
  return (
    <div className="login-container flex justify-center">
      <div className="rounded-lg shadow-xl p-2 w-96 mt-16">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="write your email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button type="submit"> submit</Button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
