"use client";

import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { debounce } from "@/lib/debounce";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { UpdateUserProfile } from "@/lib/Actions/Users";

export const Inputsync = ({
  name,
  email,
  placeholder,
}: {
  email: string;
  name?: string | undefined;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  useEffect(() => {
    setInputValue(name);
  }, [name]);

  //  using debounce to delay the api call
  const debouncedLog = useCallback(
    debounce(async (value: string) => {
      await UpdateUserProfile(email, { name: value });
    }, 1000),
    [],
  );

  function handleChange() {
    try {
      inputschema.parse(inputValue);
      setFieldErrorMsg("");
      debouncedLog(inputValue);
    } catch (error) {
      if (error instanceof ZodError) {
        setFieldErrorMsg(error.errors[0].message);
      }
    }
  }
  useEffect(() => {
    handleChange();
  }, [inputValue]);

  return (
    <div>
      <Input
        className="ml-1"
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value || "")}
        placeholder={placeholder}
      />
      {fieldErrorMsg && <p className="text-red-500">{fieldErrorMsg}</p>}
      <CardFooter>
        <Button
          onClick={() => {
            return redirect("/auth/onboarding/user/company");
          }}
        >
          Next
        </Button>
      </CardFooter>
    </div>
  );
};
