import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: "./index.html"
    },
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false
  },
  ssr: {
    noExternal: [], // add external packages if needed
    target: "node"
  },
  server: {
    middlewareMode: true
  }
});
