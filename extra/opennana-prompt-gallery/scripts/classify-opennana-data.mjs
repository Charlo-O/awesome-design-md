#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))));
const script = join(root, "scripts", "classify-prompt-gallery-data.mjs");
const result = spawnSync(process.execPath, [script], { stdio: "inherit" });

if (result.status !== 0) {
  process.exit(result.status || 1);
}
