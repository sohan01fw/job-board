import { ProfileForm } from "@/features/dashboard/user/profile/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-white mt-2">
          Manage your personal information and job preferences
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
