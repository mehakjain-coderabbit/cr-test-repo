import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (request.method !== "GET" || url.pathname !== "/reports/download") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const file = url.searchParams.get("file") || "sample.txt";
  try {
    const bytes = await readFile(file);
    response.writeHead(200, { "Content-Type": "application/octet-stream" });
    response.end(bytes);
  } catch {
    response.writeHead(404);
    response.end("Missing report");
  }
});
server.listen(3002, "0.0.0.0");
