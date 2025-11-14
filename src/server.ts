import fs from "fs";
import path from "path";
import express from "express";
import type { ViteDevServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? fs.readFileSync(
      path.resolve("dist/client/index.html"),
      "utf-8"
    )
  : "";

const ssrManifest = isProduction
  ? fs.readFileSync(
      path.resolve("dist/client/.vite/ssr-manifest.json"),
      "utf-8"
    )
  : undefined;

export async function createServer() {
  const app = express();

  // Add Vite or respective production middlewares
  let vite: ViteDevServer | undefined;

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv("dist/client", { extensions: [] }));
  }

  // Define SSR routes - these routes will be server-side rendered
  const ssrRoutes = ["/", "/states"];

  // SSR request handler
  app.use(async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, "");

      let template: string;
      let render: (url: string, template: string) => string;

      if (!isProduction && vite) {
        // Development mode: always read fresh template
        template = fs.readFileSync(
          path.resolve("index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        // Production mode: use cached template
        template = templateHtml;
        render = (await import("./entry-server.js")).render;
      }

      // Check if the route should be SSR or CSR
      const shouldSSR = ssrRoutes.some((route) => {
        if (route === "/") {
          return url === "/" || url === "";
        }
        return url === route || url.startsWith(`${route}/`);
      });

      if (shouldSSR) {
        // Server-side render the app HTML
        const html = render(url, template);

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } else {
        // Send the shell HTML for client-side rendering
        res.status(200).set({ "Content-Type": "text/html" }).send(template);
      }
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}

// Only run the server if this file is executed directly (not imported by Vercel)
if (import.meta.url.startsWith('file:')) {
  const modulePath = new URL(import.meta.url).pathname;
  const isMainModule = process.argv[1] && (
    modulePath === process.argv[1] ||
    modulePath === process.argv[1].replace(/\\/g, '/')
  );

  if (isMainModule) {
    createServer().then((app) => {
      app.listen(port, () => {
        console.log(`
Server is running!

Local:   http://localhost:${port}
Mode:    ${isProduction ? "production" : "development"}

SSR Routes:
  • / (Home)
  • /states

CSR Routes:
  • /register
  • /categories
  • All other routes
        `);
      });
    });
  }
}
