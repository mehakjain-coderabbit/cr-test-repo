import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable, unexecuted source fixture for internal Hutch scans.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/audio/normalize") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const source = url.searchParams.get("source") || "sample.wav";
  exec(`sox ${source} /tmp/normalized.wav`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3010, "0.0.0.0");
