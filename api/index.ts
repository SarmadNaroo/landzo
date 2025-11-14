import fs from "fs";
import path from "path";
import express from "express";

// Cache the Express app instance and template
let app: any;
let templateHtml = "";

async function createServer() {
  const appInstance = express();

  // Setup compression and static file serving
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;

  appInstance.use(compression());
  appInstance.use(sirv(path.join(process.cwd(), "dist/client"), { extensions: [] }));

  // Load template once
  if (!templateHtml) {
    templateHtml = fs.readFileSync(
      path.join(process.cwd(), "dist/client/index.html"),
      "utf-8"
    );
  }

  // Define SSR routes
  const ssrRoutes = ["/", "/states"];

  // Request handler
  appInstance.use(async (req, res) => {
    try {
      const url = req.originalUrl.replace("/", "");

      // Import SSR render function
      const { render } = await import(path.join(process.cwd(), "dist/server/entry-server.js"));

      // Check if route should be SSR
      const shouldSSR = ssrRoutes.some((route) => {
        if (route === "/") {
          return req.originalUrl === "/" || req.originalUrl === "";
        }
        return req.originalUrl === route || req.originalUrl.startsWith(`${route}/`);
      });

      if (shouldSSR) {
        // Server-side render
        const html = render(req.originalUrl, templateHtml);
        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } else {
        // Client-side render (send shell)
        res.status(200).set({ "Content-Type": "text/html" }).send(templateHtml);
      }
    } catch (e: any) {
      console.error('[Vercel SSR Error]:', e);
      res.status(500).end(e.stack || 'Internal Server Error');
    }
  });

  return appInstance;
}

export default async function handler(req: any, res: any) {
  try {
    // Create app once and reuse for better performance
    if (!app) {
      console.log('[Vercel] Creating Express app...');
      app = await createServer();
      console.log('[Vercel] Express app ready');
    }

    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('[Vercel] Handler error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Server Error</h1>
          <p>An error occurred. Please try again later.</p>
        </body>
      </html>
    `);
  }
}
