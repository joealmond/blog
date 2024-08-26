import path from "path";
import { copyFiles } from "./utility.js";

export default function copyAllFiles(config) {
  try {
    const { rootPath } = config.build;
    const { toCopy } = config;

    if (!toCopy || toCopy.length === 0) {
      console.log("No files to copy.");
      return;
    }

    toCopy.forEach((directory) => {
      const { srcDir, destDir } = directory;
      copyFiles(path.join(rootPath, srcDir), path.join(rootPath, destDir));
    });

    console.log("All files copied successfully.");
    return true;
  } catch (error) {
    console.error("An error occurred while copying files:", error);
    return false;
  }
}
