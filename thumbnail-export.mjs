import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable, unexecuted source fixture for internal Hutch scans.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/media/thumbnail") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const source = url.searchParams.get("clip") || "example.mp4";
  exec(`ffmpeg -i ${source} /tmp/thumbnail.png`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3007, "0.0.0.0");
