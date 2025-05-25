import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  darkMode: "class",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Hackathon",
        short_name: "MenHack",
        description: "Best App for Students!",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/fav.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/fav.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          supabase: ["@supabase/supabase-js"],
          flowbite: ["flowbite"],
        },
      },
    },
  },
});
