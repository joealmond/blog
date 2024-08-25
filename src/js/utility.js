import { readdirSync, existsSync, mkdirSync ,copyFile } from "fs";
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

  if (!existsSync(srcDir)) {
    console.error("Source directory does not exist.");
    return;
  }

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  const files = readdirSync(srcDir)

  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    copyFile(srcFile, destFile, err => {
      if (err) {
        console.error(`Error copying file ${file}: ${err}`);
      } else {
        console.log(`Copied ${srcDir}${file} to ${destDir}`);
      }
    });
  });
}

export { getDirectories, getJsFiles, copyFiles};
