import { readdirSync } from 'fs';

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function getJsFiles(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => entry.name);
}

export { getDirectories, getJsFiles };