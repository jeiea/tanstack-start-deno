import { defineConfig, type Plugin } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";

import { tanstackStart } from "@tanstack/solid-start/plugin/vite";

import solidPlugin from "vite-plugin-solid";

const isHeaderPairList = (value: unknown): value is [string, string][] =>
  Array.isArray(value) && value.every((entry) => Array.isArray(entry));

const denoNodeWriteHeadHeaderPairsFix = (): Plugin => ({
  name: "deno-node-write-head-header-pairs-fix",
  apply: "serve",
  configureServer(server) {
    if (!("Deno" in globalThis)) {
      return;
    }

    server.middlewares.use((_, response, next) => {
      const writeHead = response.writeHead.bind(response);

      response.writeHead = ((statusCode, statusMessageOrHeaders, headers) => {
        // srvx 0.11.15 keeps Headers entries as tuple arrays in Deno, but
        // Deno's node:http writeHead currently expects Node's flat header list.
        if (isHeaderPairList(statusMessageOrHeaders)) {
          return writeHead(statusCode, statusMessageOrHeaders.flat());
        }

        if (isHeaderPairList(headers)) {
          return writeHead(statusCode, statusMessageOrHeaders, headers.flat());
        }

        return writeHead(statusCode, statusMessageOrHeaders, headers);
      }) as typeof response.writeHead;

      next();
    });
  },
});

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        addExtensions: true,
      },
    }),
    denoNodeWriteHeadHeaderPairsFix(),
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
