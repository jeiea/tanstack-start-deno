import { createFileRoute } from "@tanstack/solid-router";

import { css } from "../../styled-system/css/index.mjs";
import {
  displayTitleClass,
  featureCardShellClass,
  islandKickerClass,
  islandShellClass,
  pageWrapClass,
  riseInClass,
} from "../styles/panda.ts";

const pageClass = css({
  paddingInline: "1rem",
  paddingTop: "3.5rem",
  paddingBottom: "2rem",
});

const heroClass = css({
  position: "relative",
  overflow: "hidden",
  borderRadius: "2rem",
  paddingInline: { base: "1.5rem", sm: "2.5rem" },
  paddingBlock: { base: "2.5rem", sm: "3.5rem" },
});

const orbClass = css({
  pointerEvents: "none",
  position: "absolute",
  height: "14rem",
  width: "14rem",
  borderRadius: "9999px",
});

const headingClass = css({
  marginBottom: "1.25rem",
  maxWidth: "48rem",
  fontSize: { base: "2.25rem", sm: "3.75rem" },
  lineHeight: 1.02,
  fontWeight: 700,
  letterSpacing: "-0.04em",
  color: "seaInk",
});

const leadClass = css({
  marginBottom: "2rem",
  maxWidth: "36rem",
  fontSize: { base: "1rem", sm: "1.125rem" },
  color: "seaInkSoft",
});

const actionRowClass = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
});

const primaryActionClass = css({
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

const secondaryActionClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  borderWidth: "1px",
  borderColor: "rgba(23, 58, 64, 0.2)",
  background: "rgba(255, 255, 255, 0.5)",
  paddingInline: "1.25rem",
  paddingBlock: "0.625rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "seaInk",
  textDecoration: "none",
  transitionProperty: "transform, border-color",
  transitionDuration: "160ms",
  _hover: {
    transform: "translateY(-2px)",
    borderColor: "rgba(23, 58, 64, 0.35)",
  },
});

const featuresClass = css({
  marginTop: "2rem",
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: {
    base: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
});

const featureCardClass = css({
  borderRadius: "1rem",
  padding: "1.25rem",
});

const featureTitleClass = css({
  marginBottom: "0.5rem",
  fontSize: "1rem",
  fontWeight: 600,
  color: "seaInk",
});

const featureBodyClass = css({
  margin: 0,
  fontSize: "0.875rem",
  color: "seaInkSoft",
});

const quickStartClass = css({
  marginTop: "2rem",
  borderRadius: "1rem",
  padding: "1.5rem",
});

const listClass = css({
  margin: 0,
  paddingInlineStart: "1.25rem",
  fontSize: "0.875rem",
  color: "seaInkSoft",
  "& > li + li": {
    marginTop: "0.5rem",
  },
});

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main class={`${pageWrapClass} ${pageClass}`}>
      <section class={`${islandShellClass} ${riseInClass} ${heroClass}`}>
        <div
          class={orbClass}
          style={{
            left: "-5rem",
            top: "-6rem",
            background: "radial-gradient(circle, rgba(79, 184, 178, 0.32), transparent 66%)",
          }}
        />
        <div
          class={orbClass}
          style={{
            right: "-5rem",
            bottom: "-5rem",
            background: "radial-gradient(circle, rgba(47, 106, 74, 0.18), transparent 66%)",
          }}
        />
        <p class={islandKickerClass} style={{ "margin-bottom": "0.75rem" }}>
          TanStack Start Base Template
        </p>
        <h1 class={`${displayTitleClass} ${headingClass}`}>
          Start simple, ship quickly.
        </h1>
        <p class={leadClass}>
          This base starter intentionally keeps things light: two routes, clean structure, and the essentials you need
          to build from scratch.
        </p>
        <div class={actionRowClass}>
          <a href="/about" class={primaryActionClass}>
            About This Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            class={secondaryActionClass}
          >
            Router Guide
          </a>
        </div>
      </section>

      <section class={featuresClass}>
        {[
          [
            "Type-Safe Routing",
            "Routes and links stay in sync across every page.",
          ],
          [
            "Server Functions",
            "Call server code from your UI without creating API boilerplate.",
          ],
          [
            "Streaming by Default",
            "Ship progressively rendered responses for faster experiences.",
          ],
          [
            "Panda CSS Ready",
            "Use generated style utilities without binding the app to Tailwind.",
          ],
        ].map(([title, desc], index) => (
          <article
            class={`${featureCardShellClass} ${riseInClass} ${featureCardClass}`}
            style={{ "animation-delay": `${index * 90 + 80}ms` }}
          >
            <h2 class={featureTitleClass}>{title}</h2>
            <p class={featureBodyClass}>{desc}</p>
          </article>
        ))}
      </section>

      <section class={`${islandShellClass} ${quickStartClass}`}>
        <p class={islandKickerClass} style={{ "margin-bottom": "0.5rem" }}>
          Quick Start
        </p>
        <ul class={listClass}>
          <li>
            Edit <code>src/routes/index.tsx</code> to customize the home page.
          </li>
          <li>
            Update <code>src/components/Header.tsx</code> for navigation and product links.
          </li>
          <li>
            Add routes in <code>src/routes</code> and tweak Panda-backed visual tokens in <code>panda.config.ts</code>
            {" "}
            and shared classes in <code>src/styles/panda.ts</code>.
          </li>
        </ul>
      </section>
    </main>
  );
}
