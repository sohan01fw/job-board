import { CachedUser } from "@/types/global";

export interface MessageThreadProps {
  chatId: string;
  currentUser: CachedUser;
}

export interface Message {
  id: string;
  text: string;
  content?: string;
  user: { id: string; name: string | null };
  sender?: { id: string; name: string | null; img: string };
  createdAt?: string;
  created_at?: string;
}
