import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node set-macos-wallpaper.mjs /absolute/path/to/wallpaper.png');
  process.exit(2);
}

try {
  await fs.access(filePath);
  const script = `tell application "System Events" to tell every desktop to set picture to ${JSON.stringify(filePath)}`;
  await execFileAsync('/usr/bin/osascript', ['-e', script]);
  console.log(`Set desktop wallpaper: ${filePath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
