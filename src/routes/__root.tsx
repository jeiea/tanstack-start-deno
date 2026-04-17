import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import Header from "../components/Header.tsx";
import styleCss from "../styles.css?url";
import type { RouterContext } from "../integrations/tanstack-query/provider.tsx";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    links: [{ rel: "stylesheet", href: styleCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html>
      <head>
        <HeadContent />
        <HydrationScript />
      </head>
      <body>
        <Suspense>
          <Header />
          <Outlet />
          {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
