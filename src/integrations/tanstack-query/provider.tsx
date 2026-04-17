import { QueryClient } from "@tanstack/solid-query";

export interface RouterContext {
  queryClient: QueryClient;
}

export function getContext(): RouterContext {
  const queryClient = new QueryClient();
  return {
    queryClient,
  };
}
