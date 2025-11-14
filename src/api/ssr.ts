import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";
import { render } from "../entry-server";

// Cache the template in production for better performance
let template: string;

function getTemplate() {
  if (!template) {
    template = fs.readFileSync(
      path.resolve("./dist/client/index.html"),
      "utf-8"
    );
  }
  return template;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = req.url || "/";
    const html = render(url, getTemplate());

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(html);
  } catch (error) {
    console.error("SSR Error:", error);
    res.setHeader("Content-Type", "text/html");
    return res.status(500).send("Internal Server Error");
  }
}
