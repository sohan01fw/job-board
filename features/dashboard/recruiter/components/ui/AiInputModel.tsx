import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { genAi } from "@/lib/ai/genAi";
import { useJobPostStore } from "../../stores/postJobStore";
import { readStreamableValue } from "@ai-sdk/rsc";
import Spinner from "@/components/loadingSpinner";
import { JobData } from "@/features/dashboard/types";
import { useUserStore } from "@/lib/stores/useUserStatusStore";

const placeholders = [
  "Create a job for Next.js dev...",
  "Need a Python dev with 4 yrs experience...",
  "Remote, full-time, senior role...",
];

export function AiInputModel({ setValue }: { setValue: any }) {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [jobInput, setJobInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateField } = useJobPostStore();
  const { user } = useUserStore();

  const handleGenerateJob = async () => {
    if (jobInput.length < 10) {
      alert("Please enter more than 10 characters");
      setJobInput("");
      return;
    }

    setLoading(true);
    try {
      const { object: res, error } = await genAi(jobInput);

      // console.log(res);
      if (!res) {
        console.error("no response", res);
        return;
      }

      if (error) {
        alert("I can't help with that. Please write to create job only");
        setJobInput("");
        return;
      }

      for await (const partial of readStreamableValue(res)) {
        if (!partial) continue;

        (Object.keys(partial) as (keyof JobData)[]).forEach((key) => {
          setValue(key, partial[key]);
          updateField(key, partial[key]);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // cycling placeholder effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
      setPlaceholder(placeholders[(index + 1) % placeholders.length]);
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, [index]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={user.status !== "HIRING"}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition flex gap-2 "
      >
        {loading ? <span>Generating...</span> : <span>Create with AI</span>}
        {loading ? (
          <Spinner className="w-4 h-4 mt-0.5 animate-spin text-white" />
        ) : (
          <span className="ml-3">🚀</span>
        )}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Create a Job Post</DialogTitle>
          <DialogDescription>
            Enter the job details below and AI will generate the post.
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full">
          <Textarea
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            className="w-full resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500
                       scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200"
          />
          {!jobInput &&
            placeholders.map((ph, i) => (
              <span
                key={i}
                className={`absolute left-3 top-2 text-gray-400 ease-in-out pointer-events-none transition-opacity duration-700
                  ${placeholder === ph ? "opacity-100" : "opacity-0"}`}
              >
                {ph}
              </span>
            ))}
        </div>

        <Button
          onClick={() => {
            handleGenerateJob();
            setJobInput("");
            setOpen(false);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition w-full"
        >
          🚀 Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
}
