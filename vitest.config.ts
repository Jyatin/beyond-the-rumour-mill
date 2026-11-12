import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["dotenv/config"],
    testTimeout: 20000,
    hookTimeout: 30000,
    fileParallelism: false,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./tests/__mocks__/server-only.ts"),
    },
    include: ["tests/**/*.test.ts"],
  },
});
