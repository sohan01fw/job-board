export type funcResponse =
  | {
      data: any;
      message: string;
      status: number;
    }
  | { data: any; error?: boolean; message?: string; status: number };

type CachedUser = {
  name: string | null;
  id: string;
  email: string;
  phone: string | null;
  location: string | null;
  img: string | null;
  resume: string | null;
};
