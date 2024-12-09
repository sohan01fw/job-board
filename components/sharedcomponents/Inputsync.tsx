"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { debounce } from "@/lib/debounce";
import { UpdateUserName } from "@/lib/Actions/Users";

export const Inputsync = ({ email, name }: { email: string; name: string }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  useEffect(() => {
    setInputValue(name);
  }, [name]);
  const debouncedLog = useCallback(
    debounce(async (value: string) => {
      const resUpdatedData = await UpdateUserName(email, value);
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
    handleChange();
  }, [inputValue]);

  useEffect(() => {}, []);
  return (
    <div>
      <Input
        className="ml-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {fieldErrorMsg && <p className="text-red-500">{fieldErrorMsg}</p>}
    </div>
  );
};
