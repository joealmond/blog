import path from "path";

import { copyFiles } from "./utility.js";

export default function copyAllFiles(config) {
  const { rootPath } = config.build;
    const { toCopy } = config;
    if (!toCopy || toCopy.length === 0) {
      console.log("No files to copy.");
      return;
    }
    toCopy.forEach((directory) => {
      const { srcDir, destDir } = directory;
      copyFiles(path.join(rootPath,srcDir), path.join(rootPath,destDir));
    });
  };


