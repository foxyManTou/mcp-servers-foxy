#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const categories = JSON.parse(
  readFileSync(join(root, "data/categories.json"), "utf8")
);
const servers = JSON.parse(
  readFileSync(join(root, "data/servers.json"), "utf8")
);

const categoryIds = new Set(categories.map((category) => category.id));
const requiredFields = [
  "name",
  "url",
  "description",
  "category",
  "language",
  "provider",
  "tags",
];

const errors = [];
const names = new Set();
const urls = new Set();

for (const [index, server] of servers.entries()) {
  const label = `servers[${index}] (${server.name ?? "unnamed"})`;

  for (const field of requiredFields) {
    if (
      server[field] === undefined ||
      server[field] === null ||
      server[field] === ""
    ) {
      errors.push(`${label}: missing required field "${field}"`);
    }
  }

  if (!categoryIds.has(server.category)) {
    errors.push(`${label}: invalid category "${server.category}"`);
  }

  if (!Array.isArray(server.tags) || server.tags.length === 0) {
    errors.push(`${label}: tags must be a non-empty array`);
  }

  try {
    const parsed = new URL(server.url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      errors.push(`${label}: url must use http or https`);
    }
  } catch {
    errors.push(`${label}: invalid url "${server.url}"`);
  }

  const normalizedName = String(server.name).trim().toLowerCase();
  if (names.has(normalizedName)) {
    errors.push(`${label}: duplicate name "${server.name}"`);
  }
  names.add(normalizedName);

  const normalizedUrl = String(server.url).trim().replace(/\/$/, "");
  if (urls.has(normalizedUrl)) {
    errors.push(`${label}: duplicate url "${server.url}"`);
  }
  urls.add(normalizedUrl);
}

if (servers.length < 75) {
  errors.push(`expected at least 75 servers, found ${servers.length}`);
}

if (errors.length > 0) {
  console.error("Validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Validation passed: ${servers.length} servers across ${categoryIds.size} categories.`
);
