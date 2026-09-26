import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable fixture for the isolated Hutch ticket-automation test.
const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (request.method !== "GET" || url.pathname !== "/exports/archive") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const directory = url.searchParams.get("directory") || "/tmp/reports";
  exec(`tar -czf /tmp/report-export.tgz ${directory}`, { timeout: 2000 }, (error) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? "Export failed" : "Export prepared");
  });
});
server.listen(3003, "0.0.0.0");
