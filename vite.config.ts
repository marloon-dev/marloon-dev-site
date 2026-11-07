import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Site publicado em https://marloon-dev.github.io/marloon-dev-site/
export default defineConfig({
  plugins: [react()],
  base: "/marloon-dev-site/",
});
