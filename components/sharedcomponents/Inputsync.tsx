"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { debounce } from "@/lib/debounce";

export const Inputsync = ({ name }: { name: string }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  useEffect(() => {
    setInputValue(name);
  }, [name]);
  const debouncedLog = useCallback(
    debounce((value: string) => {
      console.log(value); // Only the log is debounced
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
