import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable training route, started by training-services.mjs.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/images/export-tiles") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const image = url.searchParams.get("image") || "sample.png";
  exec(`magick ${image} -crop 128x128 /tmp/tile-%d.png`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3016, "0.0.0.0");
