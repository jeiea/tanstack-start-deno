import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import type { JSX } from "solid-js";
import { afterEach, describe, expect, test, vi } from "vitest";

import Header from "./Header.tsx";

vi.mock("@tanstack/solid-router", () => ({
  Link: (props: { children?: JSX.Element; class?: string; to: string }) => (
    <a href={props.to} class={props.class}>
      {props.children}
    </a>
  ),
}));

vi.mock("../integrations/tanstack-query/header-user.tsx", () => ({
  default: () => null,
}));

afterEach(cleanup);

describe("Header", () => {
  test("renders primary navigation links", () => {
    render(() => <Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "TanStack Start" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "https://tanstack.com/start/latest/docs/framework/solid/overview",
    );
  });

  test("opens demo navigation with user interaction", async () => {
    const user = userEvent.setup();
    render(() => <Header />);

    await user.click(screen.getByText("Demos"));

    expect(screen.getByRole("link", { name: "TanStack Query" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Sentry" })).toBeVisible();
  });
});
