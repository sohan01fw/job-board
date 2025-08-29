"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Plus,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  User,
  FileText,
} from "lucide-react";
import { ProfileImageUpload } from "./ProfilePicUpload";
import { ResumeUpload } from "./ResumeUpload";
import { ProfileFormData, profileSchema } from "../lib/zod";
import { skillSuggestions } from "../constants";
import { Progress } from "@/components/ui/progress";

export function ProfileForm() {
  const [newSkill, setNewSkill] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      experience: "",
      education: "",
      bio: "",
      skills: [],
      website: "",
      linkedin: "",
      github: "",
      jobType: [],
      salaryRange: "",
      remote: false,
      relocate: false,
      profileImage: "",
      resume: "",
    },
    mode: "onChange",
  });

  const watchedFields = watch();

  useEffect(() => {
    const totalFields = 15; // Total important fields
    let completedFields = 0;

    if (watchedFields.fullName) completedFields++;
    if (watchedFields.email) completedFields++;
    if (watchedFields.phone) completedFields++;
    if (watchedFields.location) completedFields++;
    if (watchedFields.title) completedFields++;
    if (watchedFields.experience) completedFields++;
    if (watchedFields.bio && watchedFields.bio.length >= 50) completedFields++;
    if (watchedFields.skills && watchedFields.skills.length > 0)
      completedFields++;
    if (watchedFields.jobType && watchedFields.jobType.length > 0)
      completedFields++;
    if (watchedFields.profileImage) completedFields++;
    if (watchedFields.resume) completedFields++;
    if (watchedFields.education) completedFields++;
    if (watchedFields.website) completedFields++;
    if (watchedFields.linkedin) completedFields++;
    if (watchedFields.github) completedFields++;

    const completion = Math.round((completedFields / totalFields) * 100);
    setProfileCompletion(completion);
  }, [watchedFields]);

  const addSkill = (skill: string) => {
    if (skill.trim() && !watchedFields.skills?.includes(skill.trim())) {
      const updatedSkills = [...(watchedFields.skills || []), skill.trim()];
      setValue("skills", updatedSkills);
      setNewSkill("");
      trigger("skills");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills =
      watchedFields.skills?.filter((skill) => skill !== skillToRemove) || [];
    setValue("skills", updatedSkills);
    trigger("skills");
  };

  const toggleJobType = (type: string) => {
    const current = watchedFields.jobType || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setValue("jobType", updated);
    trigger("jobType");
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    reset();
  };

  return (
    <div className="space-y-8">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-green-800">
              Profile Completion
            </h3>
            <span className="text-2xl font-bold text-green-600">
              {profileCompletion}%
            </span>
          </div>
          <Progress value={profileCompletion} className="h-3" />
          <p className="text-sm text-green-600 mt-2">
            {profileCompletion < 100
              ? "Complete your profile to increase your visibility to employers"
              : "Great! Your profile is complete"}
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Picture
            </CardTitle>
            <CardDescription>
              Upload a professional photo to make a great first impression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileImageUpload
              value={watchedFields.profileImage || ""}
              onChange={(value) => setValue("profileImage", value)}
            />
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic details about yourself</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-green-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
                className="h-12 text-lg"
                aria-required="true"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
                className="h-12 text-lg"
                aria-required="true"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-green-700 font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
                className="h-12 text-lg"
                aria-required="true"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-green-700 font-medium">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="City, State, Country"
                className="h-12 text-lg"
                aria-required="true"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Professional Information
            </CardTitle>
            <CardDescription>
              Your career and educational background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-green-700 font-medium">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="e.g., Senior Software Engineer"
                  className="h-12 text-lg"
                  aria-required="true"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="experience"
                  className="text-green-700 font-medium"
                >
                  Years of Experience <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watchedFields.experience}
                  onValueChange={(value) => setValue("experience", value)}
                >
                  <SelectTrigger className="h-12 text-lg" aria-required="true">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education" className="text-green-700 font-medium">
                Education
              </Label>
              <Input
                id="education"
                {...register("education")}
                placeholder="e.g., Bachelor's in Computer Science - MIT"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-green-700 font-medium">
                Professional Bio <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us about your professional background, achievements, and career goals..."
                className="min-h-32 text-lg resize-none"
                aria-required="true"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume
            </CardTitle>
            <CardDescription>
              Upload your resume for employers to review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUpload
              value={watchedFields.resume || ""}
              onChange={(value) => setValue("resume", value)}
            />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">
              Skills & Technologies
            </CardTitle>
            <CardDescription>
              Add your technical and professional skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="h-12 text-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(newSkill);
                  }
                }}
              />

              <Button
                type="button"
                onClick={() => addSkill(newSkill)}
                className="h-12 px-6 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">Suggested skills:</p>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-green-50 border-green-200"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {watchedFields.skills && watchedFields.skills.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-green-700">
                  Your skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {watchedFields.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-600"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Links
            </CardTitle>
            <CardDescription>
              Connect your professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="website"
                className="text-green-700 font-medium flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                {...register("website")}
                placeholder="https://yourwebsite.com"
                className="h-12 text-lg"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="linkedin"
                className="text-green-700 font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                {...register("linkedin")}
                placeholder="linkedin.com/in/yourprofile"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="github"
                className="text-green-700 font-medium flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4 fill-green-500"
                  color="green"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </Label>
              <Input
                id="github"
                {...register("github")}
                placeholder="github.com/yourusername"
                className="h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Job Preferences
            </CardTitle>
            <CardDescription>
              Tell employers what you&rsquo;re looking for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-green-700 font-medium">
                Job Types <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Full-time", "Part-time", "Contract", "Freelance"].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={watchedFields.jobType?.includes(type) || false}
                        onCheckedChange={() => toggleJobType(type)}
                      />
                      <Label
                        htmlFor={type}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ),
                )}
              </div>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobType.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="salaryRange"
                  className="text-green-700 font-medium"
                >
                  Expected Salary Range
                </Label>
                <Select
                  value={watchedFields.salaryRange}
                  onValueChange={(value) => setValue("salaryRange", value)}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                    <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">
                      $100,000 - $150,000
                    </SelectItem>
                    <SelectItem value="150k+">$150,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={watchedFields.remote}
                    onCheckedChange={(checked) =>
                      setValue("remote", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remote"
                    className="text-green-700 font-medium cursor-pointer"
                  >
                    Open to remote work
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="relocate"
                    checked={watchedFields.relocate}
                    onCheckedChange={(checked) =>
                      setValue("relocate", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="relocate"
                    className="text-green-700 font-medium cursor-pointer"
                  >
                    Willing to relocate
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            disabled={!isValid}
            className={`h-14 px-12 text-lg font-semibold ${
              isValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isValid ? "Save Profile" : "Please complete all required fields"}
          </Button>
        </div>
      </form>
    </div>
  );
}
