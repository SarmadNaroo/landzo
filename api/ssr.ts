import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

// Cache the template in production for better performance
let template: string;
let render: (url: string, template: string) => string;

function getTemplate() {
  if (!template) {
    template = fs.readFileSync(
      path.resolve("./dist/client/index.html"),
      "utf-8"
    );
  }
  return template;
}

async function getRenderFunction() {
  if (!render) {
    // Import the server entry point from the built SSR bundle
    const serverModule = await import("../dist/server/entry-server.js");
    render = serverModule.render;
  }
  return render;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = req.url || "/";
    const renderFn = await getRenderFunction();
    const html = renderFn(url, getTemplate());

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return res.status(200).send(html);
  } catch (error) {
    console.error("SSR Error:", error);
    res.setHeader("Content-Type", "text/html");
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Server Error</h1>
          <p>An error occurred during server-side rendering.</p>
        </body>
      </html>
    `);
  }
}
