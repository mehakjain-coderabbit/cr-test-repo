import { createServer } from "node:http";
import { exec } from "node:child_process";

const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (request.method !== "GET" || url.pathname !== "/diagnostics/ping") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const target = url.searchParams.get("target") || "127.0.0.1";
  exec(`ping -c 1 ${target}`, { timeout: 2000, maxBuffer: 65536 }, (error, stdout) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? "Diagnostic failed" : stdout);
  });
});

server.listen(3000, "0.0.0.0");
