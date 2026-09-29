import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable, unexecuted source fixture for internal Hutch scans.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/subtitles/export") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const track = url.searchParams.get("track") || "sample.srt";
  exec(`ffmpeg -i ${track} /tmp/subtitles.vtt`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3014, "0.0.0.0");
