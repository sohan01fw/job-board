"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { inputschema } from "@/lib/zod/global";
import { ZodError } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { PostCompanyInfo } from "@/lib/Actions/Company";
import { redirect } from "next/navigation";

export function UserCompany({
  name,
  desc,
  userId,
}: {
  name: string;
  desc: string;
  userId: string;
}) {
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [inputTextareaValue, setInputTextareaValue] = useState<
    string | undefined
  >("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(name);
    setInputTextareaValue(desc);
  }, []);
  //using debounce to delay the api call
  const debouncedLog = useCallback(
    debounce(
      async (
        inputValue: string | undefined,
        textareavalue: string | undefined,
      ) => {
        await PostCompanyInfo(inputValue, textareavalue, userId);
      },
      1000,
    ),
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
    if (inputValue || inputTextareaValue !== "") {
      debouncedLog(inputValue, inputTextareaValue);
    }
  }
  useEffect(() => {
    if (inputFocus === true) {
      handleChange();
    }
  }, [inputValue, inputTextareaValue, inputFocus]);
  return (
    <div className="">
      <div className="border border-black mt-10">
        <Card className="">
          <CardContent>
            <Label className="font-semibold text-sm m-1">Company Name</Label>
            <div>
              <Input
                className="ml-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={"write the name of company"}
                onFocus={() => {
                  setInputFocus(true);
                }}
                onBlur={() => {
                  setFieldErrorMsg("");
                  setInputFocus(false);
                }}
              />
              {fieldErrorMsg && <p className="text-red-500">{fieldErrorMsg}</p>}
            </div>
          </CardContent>
          <CardContent>
            <Label className="font-semibold text-sm m-1">Description</Label>
            <div>
              <Textarea
                className="ml-1"
                value={inputTextareaValue}
                onChange={(e) => setInputTextareaValue(e.target.value)}
                placeholder={"write the desc of company"}
                onFocus={() => {
                  setInputFocus(true);
                }}
                onBlur={() => {
                  setInputFocus(false);
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            {inputValue === "" ? (
              <Button onClick={() => setFieldErrorMsg("filed is emtpy")}>
                Next
              </Button>
            ) : (
              <Button
                onClick={() => {
                  redirect("/dashboard");
                }}
              >
                Finish
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
