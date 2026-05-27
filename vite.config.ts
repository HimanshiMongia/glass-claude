
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entryvercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "functions": {
    "dist/server/index.mjs": {
      "runtime": "nodejs24.x"
    }
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server/index.mjs"
    }
  ]
}
