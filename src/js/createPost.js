import fs from "fs";
import path from "path";
import matter from "gray-matter";

import createBaseHtml from "../createBaseHtml.js";

export default function createPost(directory, filename, config, layouts) {
  try {
    const fileContent = fs.readFileSync(path.join(directory, filename), "utf8");
    const { data: metadata, content } = matter(fileContent);
    const baseHtml = createBaseHtml(
      config,
      content,
      filename,
      layouts,
      metadata
    );
    console.log(`Generated post from ${filename}`);
    return baseHtml;
  } catch (error) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      error
    );
  }
}
