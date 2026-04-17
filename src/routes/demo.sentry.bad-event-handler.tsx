import { createFileRoute } from "@tanstack/solid-router";

import { css } from "../../styled-system/css/index.mjs";
import { islandShellClass, pageWrapClass } from "../styles/panda.ts";

const pageClass = css({
  paddingInline: "1rem",
  paddingBlock: "2rem",
});

const cardClass = css({
  borderRadius: "1rem",
  padding: "1.5rem",
});

const buttonClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.875rem",
  borderWidth: "1px",
  borderColor: "rgba(23, 58, 64, 0.14)",
  background: "rgba(255, 255, 255, 0.7)",
  paddingInline: "1rem",
  paddingBlock: "0.75rem",
  fontWeight: 600,
  color: "seaInk",
  boxShadow: "0 10px 24px rgba(23, 58, 64, 0.08)",
  transitionProperty: "transform, box-shadow",
  transitionDuration: "160ms",
  _hover: {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 30px rgba(23, 58, 64, 0.12)",
  },
});

export const Route = createFileRoute("/demo/sentry/bad-event-handler")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main class={`${pageWrapClass} ${pageClass}`}>
      <section class={`${islandShellClass} ${cardClass}`}>
        <button
          type="button"
          class={buttonClass}
          onClick={() => {
            throw new Error("Sentry Frontend Error");
          }}
        >
          Throw error
        </button>
      </section>
    </main>
  );
}
