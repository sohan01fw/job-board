import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobAppSchemaType } from "@/types/Forms";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { lang } from "./data";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useEffect, useState } from "react";

interface FormProps {
  form: UseFormReturn<JobAppSchemaType>;
  name: string;
  label: string;
  placeholder: string;
}
export function InputFormField({ form, name, label, placeholder }: FormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={`${placeholder}...`} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function InputNumberField({
  form,
  name,
  label,
  placeholder,
}: FormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              placeholder={`${placeholder}...`}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function MultiValueInputField({
  form,
  name,
  label,
  placeholder,
}: FormProps) {
  const [valueArr, setValueArr] = useState<string[]>([]);
  useEffect(() => {
    // Update the form value whenever valueArr changes
    form.setValue(name, valueArr);
  }, [valueArr, name, form]);
  function handlePushData(data: string): void {
    setValueArr([...valueArr, data]);
  }
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={`${placeholder}...`}
                value={valueArr.join(", ")} // Display array as a comma-separated string
                onChange={(e) => {
                  const changeValue = e.target.value.split(", ");
                  setValueArr(changeValue); // Update local state
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-3 border border-black  flex flex-row flex-wrap gap-2">
        {lang.map((data) => (
          <div
            key={data}
            className="cursor-pointer p-5"
            onClick={() => handlePushData(data)}
          >
            <div className=" p-1 pl-2 pr-2 rounded-lg bg-black text-white font-semibold text-sm cursor-pointer">
              {data} +
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function TextAreaForm({ form, name, label, placeholder }: FormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={`${placeholder}`} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export interface SelectInputProps extends FormProps {
  options: { value: string; label: string }[];
}

export function SelectFormInput({
  options,
  placeholder,
  form,
  label,
  name,
}: SelectInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((data, index) => {
                return (
                  <SelectItem key={index} value={data.value}>
                    {data.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
