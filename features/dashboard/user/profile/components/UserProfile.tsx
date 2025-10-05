"use client";

import { UserData } from "@/types/Forms";
import Image from "next/image";

export function UserProfile({ user }: UserData) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12 flex flex-col items-center">
      {/* Profile Image & Basic Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl gap-8">
        <div className="flex-shrink-0">
          <Image
            src={user.img || "/default-avatar.png"}
            alt={user.name}
            width={180}
            height={180}
            className="rounded-full ring-4 ring-green-500 object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
            {user.name}
          </h1>
          <p className="text-lg md:text-xl">
            {user.title || "No title provided"}
          </p>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
            {user.location || "Location not set"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
            Contact
          </h2>
          <p>
            Email: <span className="font-medium">{user.email}</span>
          </p>
          {user.phone && (
            <p>
              Phone: <span className="font-medium">{user.phone}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
            Job Preferences
          </h2>
          <p>Job Type: {user.jobType.join(", ") || "Not specified"}</p>
          {user.salaryRange && <p>Salary: {user.salaryRange}</p>}
          <p>Remote: {user.remote ? "Yes" : "No"}</p>
          <p>Relocate: {user.relocate ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Skills */}
      {user.skills.length > 0 && (
        <div className="mt-8 w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill: any) => (
              <span
                key={skill}
                className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 px-4 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bio */}
      {user.bio && (
        <div className="mt-8 w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
            About
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
        </div>
      )}

      {/* Links */}
      <div className="mt-8 w-full max-w-5xl flex flex-wrap gap-4">
        {user.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            Website
          </a>
        )}
        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            LinkedIn
          </a>
        )}
        {user.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
