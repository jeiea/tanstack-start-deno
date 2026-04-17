import { Link } from "@tanstack/solid-router";

import { css } from "../../styled-system/css/index.mjs";

import TanStackQueryHeaderUser from "../integrations/tanstack-query/header-user.tsx";
import {
  brandDotClass,
  brandPillClass,
  navLinkClass,
  pageWrapClass,
  siteHeaderClass,
  summaryNavLinkClass,
} from "../styles/panda.ts";

const headerClass = css({
  paddingInline: "1rem",
});

const navClass = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.5rem 0.75rem",
  paddingBlock: "0.75rem",
});

const brandTitleClass = css({
  margin: 0,
  flexShrink: 0,
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "-0.02em",
});

const userSlotClass = css({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const navLinksClass = css({
  order: { base: 3, sm: 2 },
  display: "flex",
  width: { base: "100%", sm: "auto" },
  flexWrap: { base: "wrap", sm: "nowrap" },
  alignItems: "center",
  columnGap: "1rem",
  rowGap: "0.25rem",
  paddingBottom: { base: "0.25rem", sm: 0 },
  fontSize: "0.875rem",
  fontWeight: 600,
});

const detailsClass = css({
  position: "relative",
  width: { base: "100%", sm: "auto" },
});

const menuClass = css({
  marginTop: "0.5rem",
  minWidth: "14rem",
  borderRadius: "0.75rem",
  borderWidth: "1px",
  borderColor: "line",
  background: "headerBg",
  padding: "0.5rem",
  boxShadow: "0 20px 40px rgba(23, 58, 64, 0.12)",
  position: { base: "static", sm: "absolute" },
  right: { sm: 0 },
});

const menuLinkClass = css({
  display: "block",
  borderRadius: "0.75rem",
  paddingInline: "0.75rem",
  paddingBlock: "0.5rem",
  fontSize: "0.875rem",
  color: "seaInkSoft",
  textDecoration: "none",
  transitionProperty: "background-color, color",
  transitionDuration: "160ms",
  _hover: {
    background: "linkBgHover",
    color: "seaInk",
  },
});

export default function Header() {
  return (
    <header class={`${siteHeaderClass} ${headerClass}`}>
      <nav class={`${pageWrapClass} ${navClass}`}>
        <h2 class={brandTitleClass}>
          <Link to="/" class={brandPillClass}>
            <span class={brandDotClass} />
            TanStack Start
          </Link>
        </h2>

        <div class={userSlotClass}>
          <TanStackQueryHeaderUser />
        </div>

        <div class={navLinksClass}>
          <Link
            to="/"
            class={navLinkClass}
            activeProps={{ class: `${navLinkClass} is-active` }}
          >
            Home
          </Link>
          <Link
            to="/about"
            class={navLinkClass}
            activeProps={{ class: `${navLinkClass} is-active` }}
          >
            About
          </Link>
          <a
            href="https://tanstack.com/start/latest/docs/framework/solid/overview"
            target="_blank"
            rel="noreferrer"
            class={navLinkClass}
          >
            Docs
          </a>
          <details class={detailsClass}>
            <summary class={summaryNavLinkClass}>Demos</summary>
            <div class={menuClass}>
              <a href="/demo/tanstack-query" class={menuLinkClass}>
                TanStack Query
              </a>
              <a href="/demo/sentry/bad-event-handler" class={menuLinkClass}>
                Sentry
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
