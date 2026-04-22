import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import Header from "../components/Header.tsx";
import styleCss from "../styles.css?url";
import { css } from "../../styled-system/css/index.mjs";
import {
  displayTitleClass,
  islandKickerClass,
  islandShellClass,
  pageWrapClass,
  riseInClass,
} from "../styles/panda.ts";
import type { RouterContext } from "../integrations/tanstack-query/provider.tsx";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    links: [{ rel: "stylesheet", href: styleCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const notFoundPageClass = css({
  paddingInline: "1rem",
  paddingTop: "3.5rem",
  paddingBottom: "2rem",
});

const notFoundCardClass = css({
  borderRadius: "2rem",
  paddingInline: { base: "1.5rem", sm: "2.5rem" },
  paddingBlock: { base: "2.5rem", sm: "3.5rem" },
  textAlign: "center",
});

const notFoundHeadingClass = css({
  marginTop: "0.75rem",
  marginBottom: "1rem",
  fontSize: { base: "2rem", sm: "3rem" },
  lineHeight: 1.05,
  fontWeight: 700,
  letterSpacing: "-0.04em",
  color: "seaInk",
});

const notFoundLeadClass = css({
  marginInline: "auto",
  marginBottom: "2rem",
  maxWidth: "32rem",
  fontSize: { base: "1rem", sm: "1.125rem" },
  color: "seaInkSoft",
});

const homeLinkClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  borderWidth: "1px",
  borderColor: "rgba(50, 143, 151, 0.3)",
  background: "rgba(79, 184, 178, 0.14)",
  paddingInline: "1.25rem",
  paddingBlock: "0.625rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "lagoonDeep",
  textDecoration: "none",
  transitionProperty: "transform, background-color",
  transitionDuration: "160ms",
  _hover: {
    transform: "translateY(-2px)",
    background: "rgba(79, 184, 178, 0.24)",
  },
});

function NotFoundComponent() {
  return (
    <main class={`${pageWrapClass} ${notFoundPageClass}`}>
      <section class={`${islandShellClass} ${riseInClass} ${notFoundCardClass}`}>
        <p class={islandKickerClass}>404</p>
        <h1 class={`${displayTitleClass} ${notFoundHeadingClass}`}>Page not found</h1>
        <p class={notFoundLeadClass}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" class={homeLinkClass}>
          Back to home
        </Link>
      </section>
    </main>
  );
}

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
