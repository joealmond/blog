import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { getDirectories } from "./utility.js";

export default function getPostsMetadata(config) {
  const posts = [];
  const postsDirectory = path.join(
    import.meta.dirname,
    "..",
    "..",
    config.build.postsPath
  );

  try {
    getDirectories(postsDirectory).forEach((directory) => {
      const directoryPath = path.join(postsDirectory, directory);
      const fileNames = fs.readdirSync(directoryPath);

      fileNames.forEach((fileName) => {
        const filePath = path.join(directoryPath, fileName);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);
        data.id = fileName.replace(".md", "");

        posts.push(data);
      });
    });

    console.log("Posts metadata fetched successfully.");
    return posts;
  } catch (err) {
    console.error("Error reading posts metadata.", err);
  }
}
