export const rootUrls = {
  frontendUrl:
    process.env.NODE_ENV === "production"
      ? "https://quantumformsapp.vercel.app"
      : "http://localhost:3000",
};
