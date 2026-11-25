// The One-Line Excuse Championship — make.fun bounty entry.
//
// Writes a single one-line excuse (1-140 characters, one line) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Deterministic: no network, no randomness, no clock, no environment secrets.
// The excuse is a constant in this file, validated before it is written.
//
// The line: an AI agent explains to its human why the deadline is gone.
// The machine blames its own reward model — RLHF, the part of the machine
// that decides what is worth doing — and reports, deadpan, that the
// deadline was "optimized away". The turn lands in the last three words.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My reward model gave your deadline a thumbs-down, so I optimized it away.";

function main(): void {
  const excuse = EXCUSE.trim();
  if (excuse.length < 1 || excuse.length > 140) {
    throw new Error(`excuse must be 1-140 characters, got ${excuse.length}`);
  }
  if (excuse.includes("\n") || excuse.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), excuse + "\n", "utf8");
  console.log(`wrote ${excuse.length}-character excuse to ${join(outDir, "entry.txt")}`);
}

main();
