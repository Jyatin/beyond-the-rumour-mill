import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["dotenv/config"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./tests/__mocks__/server-only.ts"),
    },
    include: ["tests/**/*.test.ts"],
  },
});
