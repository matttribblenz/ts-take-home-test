import deno from "@deno/vite-plugin";
import { Port } from "../lib/utils/index.ts";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import process from "node:process";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  plugins: [react(), deno()],
  server: {
    port: Port.parse(Deno.env.get("CLIENT_PORT")),
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), "../../node_modules"],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
