import fs from "fs";
import path from "path";

import { getDirectories } from "./utility.js";
import createPost from "./createPost.js";

export default function createPosts(config) {
  const { outputPostsPath, postsPath, outputPath } = config.build;

  const postsDirectory = path.join(import.meta.dirname,  "..", "..", postsPath);
  const outputDirectory = path.join(import.meta.dirname,  "..", "..", outputPath);

  try {
    const directories = getDirectories(postsDirectory);

    directories.forEach(async (post) => {
      const directory = path.join(postsDirectory, post);
      const filename = `${post}.md`;
      
      const baseHtml = await createPost(directory, filename, config);

      const outputPath = path.join(outputDirectory, outputPostsPath, post);
      fs.mkdirSync(outputPath, { recursive: true });

      fs.writeFileSync(
        path.join(outputPath, filename.replace(".md", ".html")),
        baseHtml
      );
    });
    console.log("All .md files converted to .html and copied successfully!");
  } catch (err) {
    console.error("Error reading directory:", err);
  }

}
