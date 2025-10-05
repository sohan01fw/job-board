"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Building, DollarSign, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { useJobPostStore } from "../stores/postJobStore";
import { AiInputModel } from "./ui/AiInputModel";
import { useCreateJobPost } from "../hooks/useJobPost";
import { UserData } from "@/types/Forms";
import { embedJobProfile } from "@/lib/ai/embed/jobPostEmbed";
import { useUserStore } from "@/lib/stores/useUserStatusStore";

const jobPostSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  workType: z.enum(["remote", "hybrid", "onsite"]),
  jobType: z.enum(["fulltime", "parttime", "contract", "internship"]),
  experience: z.enum(["entry", "mid", "senior", "executive"]),
  minSalary: z.number().min(1, "Minimum salary is required"),
  maxSalary: z.number().min(1, "Maximum salary is required"),
  currency: z.string().default("USD"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  contactEmail: z.string().email("Valid email is required"),
  requirements: z.array(z.string()),
  benefits: z.array(z.string()),
  skills: z.array(z.string()),
});

type JobPostFormData = z.infer<typeof jobPostSchema>;

export function PostJobForm({ user }: { user: UserData }) {
  const {
    jobData,
    updateField,
    updateMaxSalary,
    updateMinSalary,
    updateCurrency,
    addRequirement,
    removeRequirement,
    addBenefit,
    removeBenefit,
    addSkill,
    removeSkill,
  } = useJobPostStore();
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const { mutateAsync, isPending } = useCreateJobPost();
  const {
    user: { status },
  } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    // watch,
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: jobData?.title,
      company: jobData.company,
      location: jobData.location,
      workType: jobData.workType,
      jobType: jobData.jobType,
      experience: jobData.experience,
      maxSalary: jobData.maxSalary,
      minSalary: jobData.minSalary,
      currency: jobData.currency,
      description: jobData.description,
      applicationDeadline: jobData.applicationDeadline,
      contactEmail: jobData.contactEmail,
      requirements: jobData.requirements,
      benefits: jobData.benefits,
      skills: jobData.skills,
    },
  });

  const handleFieldChange = (field: keyof typeof jobData, value: any) => {
    updateField(field, value);
    if (
      field === "title" ||
      field === "company" ||
      field === "location" ||
      field === "description" ||
      field === "applicationDeadline" ||
      field === "contactEmail"
    ) {
      setValue(field, value);
    }
  };

  const handleMinSalaryChange = (value: number) => {
    updateMinSalary(value);
    setValue("minSalary", value);
  };
  const handleMaxSalaryChange = (value: number) => {
    updateMaxSalary(value);
    setValue("maxSalary", value);
  };
  const handleCurrencyChange = (value: string) => {
    updateCurrency(value);
    setValue("currency", value);
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      addRequirement(newRequirement.trim());
      setNewRequirement("");
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      addBenefit(newBenefit.trim());
      setNewBenefit("");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const onSubmit = async (data: JobPostFormData) => {
    const resData = await mutateAsync({ job: data, email: user.email });
    embedJobProfile({ jobId: resData.id, jobData: data });
    reset();
    useJobPostStore.getState().resetForm();
  };

  return (
    <div>
      <AiInputModel setValue={setValue} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-green-600" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("title")}
                placeholder="e.g. Senior Frontend Developer"
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("company")}
                placeholder="e.g. Tech Solutions Inc."
                onChange={(e) => handleFieldChange("company", e.target.value)}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("location")}
                placeholder="e.g. San Francisco, CA"
                onChange={(e) => handleFieldChange("location", e.target.value)}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Work Type
                </label>
                <Select
                  value={jobData.workType || ""}
                  onValueChange={(value: any) =>
                    handleFieldChange("workType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Type
                </label>
                <Select
                  value={jobData.jobType || ""}
                  onValueChange={(value: any) =>
                    handleFieldChange("jobType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">fulltime</SelectItem>
                    <SelectItem value="parttime">parttime</SelectItem>
                    <SelectItem value="contract">contract</SelectItem>
                    <SelectItem value="internship">cnternship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Experience Level
              </label>
              <Select
                value={jobData.experience || ""}
                onValueChange={(value: any) =>
                  handleFieldChange("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Salary Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Salary Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Min Salary <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("minSalary")}
                  placeholder="50000"
                  type="number"
                  onChange={(e) =>
                    handleMinSalaryChange(Number(e.target.value))
                  }
                />
                {errors.minSalary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.minSalary.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Max Salary <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("maxSalary")}
                  placeholder="80000"
                  type="number"
                  onChange={(e) =>
                    handleMaxSalaryChange(Number(e.target.value))
                  }
                />
                {errors.maxSalary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maxSalary.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Currency
                </label>
                <Select
                  value={jobData.currency || ""}
                  onValueChange={(value) => handleCurrencyChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                {...register("description")}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                rows={6}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a requirement..."
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), handleAddRequirement())
                }
              />
              <Button type="button" onClick={handleAddRequirement} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {jobData.requirements.map((req, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {req}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeRequirement(index)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
              />
              <Button type="button" onClick={handleAddSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {jobData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeSkill(index)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a benefit..."
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddBenefit())
                }
              />
              <Button type="button" onClick={handleAddBenefit} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {jobData.benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {benefit}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeBenefit(index)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("applicationDeadline")}
                type="date"
                onChange={(e) =>
                  handleFieldChange("applicationDeadline", e.target.value)
                }
              />
              {errors.applicationDeadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("contactEmail")}
                type="email"
                placeholder="hr@company.com"
                onChange={(e) =>
                  handleFieldChange("contactEmail", e.target.value)
                }
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          {isPending ? (
            <Button disabled className="flex-1 bg-green-600 hover:bg-green-700">
              <Loader2 className="animate-spin" />
              posting...
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={status !== "HIRING"}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Post Job
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              useJobPostStore.getState().resetForm();
            }}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
}
