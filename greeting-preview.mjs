import { createServer } from "node:http";

// Deliberately vulnerable fixture for severity-filter testing in Hutch only.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/greeting-preview") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const name = url.searchParams.get("name") || "visitor";
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(`<html><body><h1>Hello ${name}</h1></body></html>`);
}).listen(3004, "0.0.0.0");
