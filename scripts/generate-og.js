// OG image generator for ReviveForge using @vercel/og
// Usage: node scripts/generate-og.js
// Requires @vercel/og (install as devDependency)

const { ImageResponse } = require('@vercel/og');
const fs = require('fs');
const path = require('path');

const pages = [
  { route: '/', title: 'ReviveForge – Marketplace for Abandoned SaaS' },
  { route: '/marketplace', title: 'Browse Projects | ReviveForge' },
  { route: '/pricing', title: 'Pricing | ReviveForge' },
];

const outDir = path.join(__dirname, '../public/og');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

pages.forEach(({ route, title }) => {
  const fileName = route === '/' ? 'home.png' : route.replace('/', '') + '.png';
  const filePath = path.join(outDir, fileName);
  // TODO: Customize OG image design as needed
  const image = new ImageResponse(
    <div style={{
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#18181b',
      color: '#fff',
      fontSize: 64,
      fontWeight: 'bold',
      letterSpacing: '-2px',
    }}>
      {title}
    </div>,
    { width: 1200, height: 630 }
  );
  fs.writeFileSync(filePath, image.body);
  console.log('Generated:', filePath);
});

// TODO: Run this script after updating titles/designs for OG images.
