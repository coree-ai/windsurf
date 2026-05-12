import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

function replaceInFile(p, oldStr, newStr) {
  const content = fs.readFileSync(p, 'utf8');
  const newContent = content.replaceAll(oldStr, newStr);
  fs.writeFileSync(p, newContent);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/bump-version.mjs <new-version>');
  process.exit(1);
}

const newVersion = args[0];

// Derive current version from mcp_config.json
const mcpConfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'mcp_config.json'), 'utf8'));
const currentArgs = mcpConfig.mcpServers.coree.args;
const versionArg = currentArgs.find(a => a.startsWith('@coree-ai/coree@'));
if (!versionArg) {
  console.error('Could not find @coree-ai/coree@ version in mcp_config.json');
  process.exit(1);
}
const currentVersion = versionArg.replace('@coree-ai/coree@', '');

replaceInFile(path.join(REPO_ROOT, 'mcp_config.json'), currentVersion, newVersion);
replaceInFile(path.join(REPO_ROOT, '.windsurf/hooks.json'), currentVersion, newVersion);
replaceInFile(path.join(REPO_ROOT, 'README.md'), currentVersion, newVersion);

console.log(`Bumped Windsurf plugin from ${currentVersion} to ${newVersion}`);
