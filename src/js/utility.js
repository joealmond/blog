import { readdirSync } from "fs";

function getDirectories(source) {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    console.error("Error occurred reding directories.", error);
  }
}

function getJsFiles(source) {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
      .map((entry) => entry.name);
  } catch (error) {
    console.error("Error occurred reding directories.", error);
  }
}

export { getDirectories, getJsFiles };
