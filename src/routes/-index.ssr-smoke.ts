import { assertEquals, assertStringIncludes } from "@std/assert";

const ROOT_DIR = new URL("../..", import.meta.url);
const DEV_RESPONSE_TIMEOUT_MS = 15_000;

Deno.test("home route responds from Vite dev SSR", async () => {
  const port = getAvailablePort();
  const output = createOutputBuffer();
  const child = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "-A",
      "--",
      "npm:vite",
      "dev",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    cwd: ROOT_DIR,
    stdout: "piped",
    stderr: "piped",
  }).spawn();
  const stdout = collectOutput(child.stdout, output.append);
  const stderr = collectOutput(child.stderr, output.append);
  const status = child.status;

  try {
    const response = await waitForHtmlResponse({
      port,
      status,
      output: output.read,
      timeoutMs: DEV_RESPONSE_TIMEOUT_MS,
    });

    assertEquals(response.status, 200);
    assertStringIncludes(await response.text(), "<!DOCTYPE html>");
  } finally {
    child.kill("SIGTERM");
    await status.catch(() => undefined);
    await Promise.all([stdout, stderr]);
  }
});

function getAvailablePort(): number {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  const port = (listener.addr as Deno.NetAddr).port;
  listener.close();
  return port;
}

function createOutputBuffer() {
  let text = "";

  return {
    append(chunk: string) {
      text += chunk;
    },
    read() {
      return text;
    },
  };
}

async function collectOutput(
  stream: ReadableStream<Uint8Array>,
  append: (chunk: string) => void,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      append(decoder.decode());
      return;
    }

    append(decoder.decode(value, { stream: true }));
  }
}

async function waitForHtmlResponse(options: {
  port: number;
  status: Promise<Deno.CommandStatus>;
  output: () => string;
  timeoutMs: number;
}): Promise<Response> {
  const url = `http://127.0.0.1:${options.port}/`;
  const deadline = Date.now() + options.timeoutMs;
  let exited: Deno.CommandStatus | undefined;
  options.status.then((status) => {
    exited = status;
  });

  while (Date.now() < deadline) {
    if (exited) {
      throw new Error(
        `Vite dev server exited before responding. Code: ${exited.code}\n${options.output()}`,
      );
    }

    const response = await fetchWithTimeout(url, 1_000).catch(() => undefined);
    if (response?.ok) {
      return response;
    }

    response?.body?.cancel();
    await delay(250);
  }

  throw new Error(
    `Vite dev server did not respond within ${options.timeoutMs}ms.\n${options.output()}`,
  );
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
