"use client";
import React from "react";
import { JSX } from "react/jsx-runtime";
import { DeleteJobs } from "../actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DeleteJobbtn({ id }: { id: string }): JSX.Element {
  async function handleDeleteJob() {
    const delJob = await DeleteJobs(id);
    if (delJob?.error === true) {
      alert("error while deleting job");
      console.log("error while deleting job");
    }
  }
  return <DropdownMenuItem onClick={handleDeleteJob}>Delete</DropdownMenuItem>;
}
