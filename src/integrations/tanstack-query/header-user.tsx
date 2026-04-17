import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

export default function AppTanstackQueryHeaderUser() {
  return import.meta.env.DEV
    ? <SolidQueryDevtools buttonPosition="bottom-right" />
    : null;
}
