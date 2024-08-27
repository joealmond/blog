import fs from "fs";
import path from "path";
import matter from "gray-matter";

import createPostHtml from "./createPostHtml.js";
import createBaseHtml from "../createBaseHtml.js";

export default async function createPost(directory, filename, config, layouts) {
  try {
    const fileContent = fs.readFileSync(path.join(directory, filename), "utf8");
    const { data: metadata, content } = matter(fileContent);
    const postHtml = await createPostHtml(content, metadata);
    const postWithBaseHtml = createBaseHtml(
      config,
      postHtml,
      filename,
      layouts
    );
    console.log(`Generated post from ${filename}`);
    return postWithBaseHtml;
  } catch (error) {
    console.error(
      `Error occurred while importing or processing the file ${filename}:`,
      error
    );
    return null;
  }
}
