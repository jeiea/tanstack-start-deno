import { createQuery, queryOptions } from "@tanstack/solid-query";
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

const headingClass = css({
  marginBottom: "1rem",
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "seaInk",
});

const listClass = css({
  margin: 0,
  paddingInlineStart: "1.25rem",
  color: "seaInkSoft",
  "& > li + li": {
    marginTop: "0.5rem",
  },
});

async function fetchPeople() {
  return await Promise.resolve([{ name: "John Doe" }, { name: "Jane Doe" }]);
}

const peopleQueryOptions = queryOptions({
  queryKey: ["people"],
  queryFn: fetchPeople,
});

export const Route = createFileRoute("/demo/tanstack-query")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(peopleQueryOptions);
  },
  component: App,
});

function App() {
  const peopleQuery = createQuery(() => peopleQueryOptions);

  return (
    <main class={`${pageWrapClass} ${pageClass}`}>
      <section class={`${islandShellClass} ${cardClass}`}>
        <h1 class={headingClass}>People list from TanStack Query cache</h1>
        <ul class={listClass}>
          {peopleQuery.data?.map((person) => <li>{person.name}</li>)}
        </ul>
      </section>
    </main>
  );
}
