import { createFileRoute } from "@tanstack/solid-router";

import { css } from "../../styled-system/css/index.mjs";
import {
  displayTitleClass,
  islandKickerClass,
  islandShellClass,
  pageWrapClass,
} from "../styles/panda.ts";

const pageClass = css({
  paddingInline: "1rem",
  paddingBlock: "3rem",
});

const sectionClass = css({
  borderRadius: "1rem",
  padding: { base: "1.5rem", sm: "2rem" },
});

const headingClass = css({
  marginBottom: "0.75rem",
  fontSize: { base: "2.25rem", sm: "3rem" },
  fontWeight: 700,
  color: "seaInk",
});

const bodyClass = css({
  margin: 0,
  maxWidth: "48rem",
  fontSize: "1rem",
  lineHeight: 1.8,
  color: "seaInkSoft",
});

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main class={`${pageWrapClass} ${pageClass}`}>
      <section class={`${islandShellClass} ${sectionClass}`}>
        <p class={islandKickerClass} style={{ "margin-bottom": "0.5rem" }}>
          About
        </p>
        <h1 class={`${displayTitleClass} ${headingClass}`}>
          A small starter with room to grow.
        </h1>
        <p class={bodyClass}>
          TanStack Start gives you type-safe routing, server functions, and modern SSR defaults. Use
          this as a clean foundation, then layer in your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  );
}
