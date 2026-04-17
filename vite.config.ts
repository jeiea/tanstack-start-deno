import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";

import { tanstackStart } from "@tanstack/solid-start/plugin/vite";

import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        addExtensions: true,
      },
    }),
    solidPlugin({ ssr: true }),
    {
      // crawlFrameworkPkgs (vitefu) fails to detect solid packages in deno's
      // .deno node_modules layout, so we manually add them to noExternal.
      name: "deno-solid-ssr-fix",
      configEnvironment(name, config) {
        if (name === "ssr") {
          const noExternal = Array.isArray(config.resolve?.noExternal) ? config.resolve!.noExternal : [];
          noExternal.push(
            /^@tanstack\/solid-router/,
            /^@tanstack\/solid-query/,
            /^@tanstack\/solid-router-devtools/,
            /^@tanstack\/solid-query-devtools/,
            /^@sentry\/solid/,
          );
          config.resolve ??= {};
          config.resolve.noExternal = noExternal;
        }
      },
    },
    nitro(),
  ],
  nitro: {},
});
