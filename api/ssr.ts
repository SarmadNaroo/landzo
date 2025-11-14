import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const templatePath = path.resolve(process.cwd(), 'dist/client/spa.html')
const template = fs.readFileSync(templatePath, 'utf-8')

export default async function handler(req: any, res: any) {
  try {
    const url = '/'

    const entryPath = path.resolve(process.cwd(), 'dist/server/entry-server.js')
    const { render } = await import(pathToFileURL(entryPath).href)

    const appHtml = render(url)
    const html = template.replace('<!--app-html-->', appHtml)

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (e: any) {
    console.error(e)
    res.status(500).send(e?.message ?? String(e))
  }
}
