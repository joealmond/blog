import { readdirSync, existsSync, mkdirSync, copyFileSync } from "fs";
import path from "path";

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

function copyFiles(srcDir, destDir) {
  try {
    if (!existsSync(srcDir)) {
      throw new Error("Source directory does not exist.");
    }

    if (!existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = readdirSync(srcDir);

    files.forEach((file) => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      try {
        copyFileSync(srcFile, destFile); // No third argument needed
        console.log(`Copied ${srcFile} to ${destFile}`);
      } catch (err) {
        console.error(`Error copying file ${srcFile} to ${destFile}: ${err}`);
      }
    });

    return true;
  } catch (error) {
    console.error("An error occurred during the copy process:", error);
    return false;
  }
}

export { getDirectories, getJsFiles, copyFiles };
