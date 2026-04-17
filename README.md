# TanStack Start with deno

To run this application:

```bash
deno task dev
```

# Building For Production

To build this application for production:

```bash
deno task build
deno task start
```

## Styling

This project uses [Panda CSS](https://panda-css.com/) for styling.

## TanStack Query SSR

- `src/router.tsx` creates a fresh `QueryClient` in `getRouter()` and wires it
  to `setupRouterSsrQueryIntegration(...)`
- `src/routes/__root.tsx` types the router context and relies on that
  integration to provide `QueryClientProvider`
- `src/routes/demo.tanstack-query.tsx` shows the pattern used here:
  `loader` prefetch with `context.queryClient.ensureQueryData(...)`, then read
  the same query with `createQuery(...)`

## T3Env

- You can use T3Env to add type safety to your environment variables.
- Add Environment variables to the `src/env.mjs` file.
- Use the environment variables in your code.

### Usage

```ts
import { env } from "@/env";

console.log(env.VITE_APP_TITLE);
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based
routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes`
directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between
them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the
`Link` component from `@tanstack/solid-router`.

```tsx
import { Link } from "@tanstack/solid-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the
[Link documentation](https://tanstack.com/router/v1/docs/framework/solid/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in
`src/routes/__root.tsx`. Anything you add to the root route will appear in all
the routes.

More information on layouts can be found in the
[Layouts documentation](https://tanstack.com/router/latest/docs/framework/solid/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side
code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from "@tanstack/solid-start";

const getServerTime = createServerFn({
  method: "GET",
}).handler(async () => {
  return new Date().toISOString();
});
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack
Query to fetch data from a server. But you can also use the `loader`
functionality built into TanStack Router to load the data for a route before
it's rendered.

For example:

```tsx
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/people")({
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json();
  },
  component: PeopleComponent,
});

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      <For each={data().results}>{(person) => <li>{person.name}</li>}</For>
    </ul>
  );
}
```

Loaders simplify your data fetching logic dramatically. Check out more
information in the
[Loader documentation](https://tanstack.com/router/latest/docs/framework/solid/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a
starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the
[TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit
[TanStack Start](https://tanstack.com/start).
