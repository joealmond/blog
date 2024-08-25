import fs from "fs";
import path from "path";

import { getDirectories } from "./utility.js";
import createPost from "./createPost.js";

export default async function createPosts(config, layouts) {
  const { outputPostsPath, postsPath, outputPath } = config.build;

  const postsDirectory = path.join(import.meta.dirname, "..", "..", postsPath);
  const outputDirectory = path.join(
    import.meta.dirname,
    "..",
    "..",
    outputPath
  );

  try {
    const directories = getDirectories(postsDirectory);

    await Promise.all(directories.map(async (post) => {
      const directory = path.join(postsDirectory, post);
      const filename = `${post}.md`;

      const baseHtml = await createPost(directory, filename, config, layouts);

      const outputPath = path.join(outputDirectory, outputPostsPath, post);
      fs.mkdirSync(outputPath, { recursive: true });

      const newFilename = filename.replace(".md", ".html");

      fs.writeFileSync(
        path.join(outputPath, newFilename),
        baseHtml
      );
      console.log(`Copied post ${outputPath}${filename}`);
    }));

    console.log("All posts converted to HTML and copied successfully!");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}
