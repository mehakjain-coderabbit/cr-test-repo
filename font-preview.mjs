import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable training route, started by training-services.mjs.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/fonts/preview") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const font = url.searchParams.get("font") || "sample.ttf";
  exec(`fontforge -lang=ff -c 'Open($1); Generate($2)' ${font} /tmp/font.svg`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3013, "0.0.0.0");
