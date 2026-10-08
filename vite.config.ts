import { defineConfig } from "vite";

// Keep generated browser profiles and visual captures in dist/ intact.
export default defineConfig({
  build: { outDir: "dist/app" },
});
