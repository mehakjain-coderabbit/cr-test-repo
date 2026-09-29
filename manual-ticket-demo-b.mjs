import { createServer } from "node:http";
import { exec } from "node:child_process";

// Deliberately vulnerable training route, started by training-services.mjs.
createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname !== "/manual-demo/convert-spreadsheet") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const sheet = url.searchParams.get("sheet") || "sample.xlsx";
  exec(`libreoffice --headless --convert-to pdf --outdir /tmp ${sheet}`, (error, stdout, stderr) => {
    response.writeHead(error ? 500 : 200, { "Content-Type": "text/plain" });
    response.end(error ? stderr : stdout);
  });
}).listen(3018, "0.0.0.0");
