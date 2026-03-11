#!/usr/bin/env node
/**
 * Validates frontmatter in all MDX content files at build time.
 * Exits with code 1 if any file has invalid or missing frontmatter fields.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

const VALID_LOCALES = ['es', 'en'];
const VALID_LOCATIONS = ['playa-del-carmen', 'cancun', 'both'];

const blogRequiredFields = {
  title: 'string',
  slug: 'string',
  description: 'string',
  date: 'string',
  author: 'string',
  tags: 'array',
  image: 'string',
  locale: 'string',
  translationSlug: 'string',
};

const artistRequiredFields = {
  name: 'string',
  slug: 'string',
  role: 'string',
  location: 'string',
  specialties: 'array',
  image: 'string',
  locale: 'string',
  translationSlug: 'string',
};

let errors = 0;

function error(filePath, message) {
  console.error(`  ✗ ${path.relative(process.cwd(), filePath)}: ${message}`);
  errors++;
}

function validateFields(filePath, data, requiredFields) {
  for (const [field, type] of Object.entries(requiredFields)) {
    if (data[field] == null || data[field] === '') {
      error(filePath, `missing required field "${field}"`);
      continue;
    }
    if (type === 'array' && !Array.isArray(data[field])) {
      error(filePath, `"${field}" must be an array`);
    } else if (type === 'string' && typeof data[field] !== 'string') {
      error(filePath, `"${field}" must be a string`);
    }
  }
}

function validateBlog(filePath, data) {
  validateFields(filePath, data, blogRequiredFields);

  if (data.locale && !VALID_LOCALES.includes(data.locale)) {
    error(filePath, `"locale" must be one of: ${VALID_LOCALES.join(', ')}`);
  }

  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    error(filePath, `"date" must be YYYY-MM-DD format`);
  }

  if (data.image && !data.image.startsWith('/')) {
    error(filePath, `"image" must be an absolute path starting with /`);
  }
}

function validateArtist(filePath, data) {
  validateFields(filePath, data, artistRequiredFields);

  if (data.locale && !VALID_LOCALES.includes(data.locale)) {
    error(filePath, `"locale" must be one of: ${VALID_LOCALES.join(', ')}`);
  }

  if (data.location && !VALID_LOCATIONS.includes(data.location)) {
    error(filePath, `"location" must be one of: ${VALID_LOCATIONS.join(', ')}`);
  }

  if (data.image && !data.image.startsWith('/')) {
    error(filePath, `"image" must be an absolute path starting with /`);
  }

  if (data.gallery && !Array.isArray(data.gallery)) {
    error(filePath, `"gallery" must be an array`);
  }
}

function validateDir(dir, type) {
  if (!fs.existsSync(dir)) return;

  for (const locale of VALID_LOCALES) {
    const localeDir = path.join(dir, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);

      if (type === 'blog') {
        validateBlog(filePath, data);
      } else {
        validateArtist(filePath, data);
      }
    }
  }
}

console.log('Validating MDX frontmatter...');
validateDir(path.join(contentDir, 'blog'), 'blog');
validateDir(path.join(contentDir, 'artists'), 'artist');

if (errors > 0) {
  console.error(`\nFrontmatter validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('All MDX frontmatter is valid.');
}
