#!/usr/bin/env node

import { chmodSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const gitDir = join(root, ".git");
const hookSrc = join(root, ".githooks/pre-commit");
const hookDest = join(gitDir, "hooks/pre-commit");

if (!existsSync(gitDir)) {
  process.exit(0);
}

mkdirSync(join(gitDir, "hooks"), { recursive: true });
copyFileSync(hookSrc, hookDest);
chmodSync(hookDest, 0o755);

console.log("Installed pre-commit hook.");
