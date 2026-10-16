import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Warsha API is served over plain http. Browsers block http calls from an
// https site, so the app calls "/api/..." and this proxy forwards it in dev.
// In production, add the same rewrite on your host (e.g. vercel.json below).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://warshaa.runasp.net",
        changeOrigin: true,
      },
    },
  },
});
