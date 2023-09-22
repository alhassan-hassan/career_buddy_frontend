import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@network": path.resolve(__dirname, "./src/network"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
