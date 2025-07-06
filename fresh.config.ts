import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import manifest from "./manifest.gen.ts";
import { mcpServer } from "@deco/mcp";

export default defineConfig({
  plugins: plugins({
    manifest,
    useServer: (deco, hono) => {
      hono.use(
        "/*",
        mcpServer(deco, {
          include: ["site/loaders/home.ts", "site/loaders/getBlogPosts.ts", "site/loaders/getPost.ts"],
          mcpPath: "/mcp",
        }),
      );
    },
  }),
});
