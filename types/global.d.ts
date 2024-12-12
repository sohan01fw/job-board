export type funcResponse =
  | {
      data?: any;
      message: string;
      status: number;
    }
  | { error?: boolean; message?: string; status: number };
