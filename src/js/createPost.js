import fs from "fs";
import path from "path";
import matter from "gray-matter";

import createPostHtml from "./createPostHtml.js";

export default function createPost(directory, filename, config, layouts) {
  try {
    const fileContent = fs.readFileSync(path.join(directory, filename), "utf8");
    const { data: metadata, content } = matter(fileContent);
    const postHtml = createPostHtml(
      content,
      metadata
    );
    console.log(`Generated post from ${filename}`);
    return postHtml;
  } catch (error) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      error
    );
    return null;
  }
}
