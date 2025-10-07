// export const SITE_URL = `https://job-board-all.vercel.app`;
// export const REDIRECT_URL = `https://job-board-all.vercel.app/auth/callback`;

// export const localURL = `http://localhost:3000`;
// export const localREDIRECT_URL = `http://localhost:3000/auth/callback`;

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://job-board-all.vercel.app"
    : "http://localhost:3000";

export const REDIRECT_URL =
  process.env.NODE_ENV === "production"
    ? "https://job-board-all.vercel.app/auth/callback"
    : "http://localhost:3000/auth/callback";
