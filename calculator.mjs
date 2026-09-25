import { createServer } from "node:http";

const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (request.method !== "GET" || url.pathname !== "/calculator/evaluate") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const expression = url.searchParams.get("expression") || "1 + 1";
  try {
    const value = eval(expression);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(String(value));
  } catch {
    response.writeHead(400);
    response.end("Invalid expression");
  }
});
server.listen(3001, "0.0.0.0");
