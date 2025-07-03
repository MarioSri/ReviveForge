import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const swaggerUiDist = require('swagger-ui-dist');
const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/openapi.yaml')) {
    // Serve the OpenAPI YAML spec
    const specPath = path.join(process.cwd(), 'openapi.yaml');
    const yaml = fs.readFileSync(specPath, 'utf8');
    return new NextResponse(yaml, {
      status: 200,
      headers: { 'Content-Type': 'text/yaml' },
    });
  }
  // Serve Swagger UI static assets
  const asset = url.pathname.replace('/api/docs', '') || '/index.html';
  const assetPath = path.join(swaggerUiAssetPath, asset);
  if (fs.existsSync(assetPath)) {
    const content = fs.readFileSync(assetPath);
    let contentType = 'text/html';
    if (asset.endsWith('.js')) contentType = 'application/javascript';
    if (asset.endsWith('.css')) contentType = 'text/css';
    if (asset.endsWith('.png')) contentType = 'image/png';
    if (asset.endsWith('.yaml')) contentType = 'text/yaml';
    return new NextResponse(content, {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
  }
  return new NextResponse('Not found', { status: 404 });
}
