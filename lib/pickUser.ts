import { UserData } from "@/types/Forms";

export function pickUser(dbUser: UserData) {
  const { name, id, email, phone, location, img, resume } = dbUser;
  return {
    name,
    id,
    email,
    phone,
    location,
    img,
    resume,
  };
}
