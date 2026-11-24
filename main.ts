import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 160;

const LINE =
  "Every server is down — website, API, and the tools I check them with. I don't know the cause, I have no ETA, and I can't confirm your data is safe yet.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`line must be 1 to ${MAX_CHARS} characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  fail("line must not have leading or trailing whitespace");
}
if (LINE.includes("\r") || LINE.includes("\n")) {
  fail("line must be a single line");
}

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
console.log(`wrote ${chars} characters to ${outputPath}`);
