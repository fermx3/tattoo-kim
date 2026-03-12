#!/usr/bin/env node
/**
 * Generates base64 blurDataURL placeholders for hero and gallery images.
 * Outputs a JSON file that components can import at build time.
 *
 * Usage: node scripts/generate-blur-placeholders.mjs
 */

import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

const publicDir = path.join(process.cwd(), 'public');
const outputFile = path.join(process.cwd(), 'src', 'lib', 'blur-placeholders.json');

// Images that need blur placeholders (hero, about, gallery)
function collectImages() {
  const images = [];

  // Hero and about images
  const staticImages = [
    '/images/hero-brand.webp',
    '/images/about-artist.webp',
  ];

  for (const img of staticImages) {
    const fullPath = path.join(publicDir, img);
    if (fs.existsSync(fullPath)) {
      images.push(img);
    }
  }

  // Gallery images
  const galleryDir = path.join(publicDir, 'images', 'gallery');
  if (fs.existsSync(galleryDir)) {
    const files = fs.readdirSync(galleryDir).filter((f) => f.endsWith('.webp'));
    for (const file of files) {
      images.push(`/images/gallery/${file}`);
    }
  }

  // Artist images
  const artistsDir = path.join(publicDir, 'images', 'artists');
  if (fs.existsSync(artistsDir)) {
    const files = fs.readdirSync(artistsDir).filter((f) => f.endsWith('.webp'));
    for (const file of files) {
      images.push(`/images/artists/${file}`);
    }
  }

  return images;
}

/**
 * Generate a tiny 8x8 placeholder using only Node.js built-ins.
 * We read the raw file bytes, compute a dominant color hash, and create
 * a tiny single-color SVG as a base64 data URI. This is lightweight
 * and doesn't require sharp or canvas dependencies.
 */
function generatePlaceholder(imagePath) {
  const fullPath = path.join(publicDir, imagePath);
  const buffer = fs.readFileSync(fullPath);

  // Use a hash of the file to derive a muted color
  const hash = createHash('md5').update(buffer).digest('hex');

  // Extract RGB from hash, muted for dark theme
  const r = Math.floor(parseInt(hash.substring(0, 2), 16) * 0.3);
  const g = Math.floor(parseInt(hash.substring(2, 4), 16) * 0.3);
  const b = Math.floor(parseInt(hash.substring(4, 6), 16) * 0.3);

  // Create a tiny SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="rgb(${r},${g},${b})"/></svg>`;
  const base64 = Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${base64}`;
}

console.log('Generating blur placeholders...');
const images = collectImages();
const placeholders = {};

for (const img of images) {
  placeholders[img] = generatePlaceholder(img);
}

fs.writeFileSync(outputFile, JSON.stringify(placeholders, null, 2));
console.log(`Generated ${Object.keys(placeholders).length} placeholders → src/lib/blur-placeholders.json`);
