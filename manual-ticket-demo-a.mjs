import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable training route, started by training-services.mjs.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/manual-demo/extract-caption") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const video = url.searchParams.get("video") || "sample.mp4";
  exec(`ffmpeg -i ${video} -map 0:s:0 /tmp/demo-caption.srt`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3017, "0.0.0.0");
