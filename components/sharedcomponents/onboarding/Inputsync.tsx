"use client";

import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { debounce } from "@/lib/debounce";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const Inputsync = ({
  name,
  updateNameAction,
  placeholder,
}: {
  name?: string | undefined;
  updateNameAction: (value: string) => Promise<void>;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  useEffect(() => {
    setInputValue(name);
  }, [name]);

  //using debounce to delay the api call
  const debouncedLog = useCallback(
    debounce(async (value: string) => {
      await updateNameAction(value);
    }, 1000),
    [],
  );

  function handleChange() {
    try {
      inputschema.parse(inputValue);
      setFieldErrorMsg("");
    } catch (error) {
      if (error instanceof ZodError) {
        setFieldErrorMsg(error.errors[0].message);
      }
    }

    debouncedLog(inputValue);
  }
  useEffect(() => {
    if (inputFocus == true) {
      handleChange();
    }
  }, [inputFocus]);

  return (
    <div>
      <Input
        className="ml-1"
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value || "")}
        placeholder={placeholder}
        onFocus={() => {
          setInputFocus(true);
        }}
        onBlur={() => {
          setFieldErrorMsg("");
          setInputFocus(false);
        }}
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
