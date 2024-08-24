import fs from "fs";
import path from "path";
import matter from "gray-matter";

import createBaseHtml from "../createBaseHtml.js";

export default function createPost(directory, filename, config) {
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf8"
    );
    const { data: metadata, content } = matter(fileContent);

    const baseHtml = createBaseHtml(config, content, filename, metadata);
    return baseHtml;
  }