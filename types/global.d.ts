export type funcResponse =
  | {
      data: any;
      message: string;
      status: number;
    }
  | { data: any; error?: boolean; message?: string; status: number };
