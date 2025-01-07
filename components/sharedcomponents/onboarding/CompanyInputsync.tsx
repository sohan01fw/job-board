"use client";

import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { inputschema } from "@/lib/zod/global";
import { debounce } from "@/lib/debounce";
import { Input } from "@/components/ui/input";

export const CompanyInputsync = ({
  name,
  updateNameAction,
  placeholder,
}: {
  name?: string | undefined;
  updateNameAction: (value: { name: string }) => Promise<unknown>;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  useEffect(() => {
    setInputValue(name);
  }, [name]);

  //using debounce to delay the api call
  const debouncedLog = useCallback(
    debounce(async (values: string) => {
      const value = {
        name: values,
      };
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
    </div>
  );
};
