import { createServer } from '../src/server';

// Cache the Express app instance
let app: any;

export default async function handler(req: any, res: any) {
  try {
    // Ensure production mode on Vercel
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'production';
    }

    // Create app once and reuse for better performance
    if (!app) {
      console.log('[Vercel] Creating Express app instance...');
      app = await createServer();
      console.log('[Vercel] Express app created successfully');
    }

    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('[Vercel] Error in serverless function:', error);
    res.status(500).send('Internal Server Error');
  }
}
