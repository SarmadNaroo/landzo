import { createServer } from '../src/server';

// Cache the Express app instance
let app: any;

export default async function handler(req: any, res: any) {
  // Create app once and reuse for better performance
  if (!app) {
    app = await createServer();
  }

  // Let Express handle the request
  return app(req, res);
}
